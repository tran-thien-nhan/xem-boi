"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { ReadingType, SelectedCard, ReadingResult, UserInfo } from './types';
import { TAROT_DECK } from './constants';
import { getTarotReading } from './_services/geminiService';
import TarotCardView from './_components/TarotCardView';
import DonationModal from './_components/DonationModal';

const LOADING_MESSAGES = [
  "Đang kết nối với các vì sao...",
  "Lắng nghe tín hiệu từ vũ trụ...",
  "Đang tính toán các con số định mệnh...",
  "Sắp xếp các dòng năng lượng bản mệnh...",
  "Đang khai mở cánh cửa vận mệnh...",
  "Đang chuẩn bị lời phán từ các bậc thầy..."
];

const Home: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'personalInfo' | 'question' | 'picking' | 'reading'>('landing');
  const [readingType, setReadingType] = useState<ReadingType>(ReadingType.SINGLE);
  const [question, setQuestion] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ fullName: '', dob: '', birthTime: '' });
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [readingResult, setReadingResult] = useState<ReadingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [isButtonGlowing, setIsButtonGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDonationModal(true);
    }, 300000); // 5 phút

    return () => clearInterval(interval);
  }, []);

  // Cycle loading messages
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const shuffledDeck = useMemo(() => {
    return [...TAROT_DECK].sort(() => 0.5 - Math.random());
  }, [step === 'picking']);

  const startReading = (type: ReadingType) => {
    setReadingType(type);
    setSelectedCards([]);
    setLoadingMsgIdx(0);
    if (type === ReadingType.NEW_YEAR || type === ReadingType.NUMEROLOGY) {
      setStep('personalInfo');
    } else {
      setStep('question');
    }
    setQuestion('');
    setError(null);
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.fullName || !userInfo.dob) {
      setError('Vui lòng nhập ít nhất Họ tên và Ngày sinh.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      let picked: SelectedCard[] = [];
      if (readingType === ReadingType.NEW_YEAR) {
        const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
        picked = shuffled.slice(0, 3).map((card) => ({
          card,
          isReversed: Math.random() > 0.7,
        }));
        setSelectedCards(picked);
      }

      const result = await getTarotReading(picked, readingType, "", userInfo);
      setReadingResult(result);
      setStep('reading');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi kết nối với vũ trụ.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToPickingStep = () => {
    setError(null);
    setSelectedCards([]);
    setStep('picking');
  };

  const toggleSelectCard = (cardId: string) => {
    const maxCards = readingType === ReadingType.SINGLE ? 1 : 3;
    if (selectedCards.some(sc => sc.card.id === cardId)) {
      setSelectedCards(selectedCards.filter(sc => sc.card.id !== cardId));
      return;
    }
    if (selectedCards.length < maxCards) {
      const card = TAROT_DECK.find(c => c.id === cardId);
      if (card) {
        setSelectedCards([...selectedCards, {
          card,
          isReversed: Math.random() > 0.7,
          positionName: readingType === ReadingType.THREE_CARD
            ? (selectedCards.length === 0 ? 'Quá Khứ' : selectedCards.length === 1 ? 'Hiện Tại' : 'Tương Lai')
            : undefined
        }]);
      }
    }
  };

  const getInterpretation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTarotReading(selectedCards, readingType, question.trim());
      setReadingResult(result);
      setStep('reading');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const requiredCount = readingType === ReadingType.SINGLE ? 1 : 3;
  const isNoCardsInUI = readingType === ReadingType.NEW_YEAR || readingType === ReadingType.NUMEROLOGY;

  return (
    <div className="min-h-screen text-amber-100 flex flex-col relative overflow-x-hidden bg-slate-950">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/30 rounded-full blur-[100px]"></div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-2 border-amber-500/20 border-b-transparent rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl animate-pulse">🔮</span>
            </div>
          </div>
          <div className="space-y-4 max-w-xs">
            <h2 className="mystic-font text-xl text-amber-500 uppercase tracking-widest animate-pulse">
              Đang Luận Giải
            </h2>
            <p className="text-amber-200/60 italic text-sm transition-all duration-1000">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
            <div className="w-full h-1 bg-amber-950 rounded-full overflow-hidden mt-6">
              <div className="h-full bg-amber-500 animate-[loading-bar_10s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      <header className="p-4 md:p-6 flex justify-between items-center z-10 border-b border-amber-900/30 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('landing')}>
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg">M</div>
          <span className="mystic-font text-lg font-bold tracking-widest text-amber-500">MYSTIC AI</span>
        </div>
        <button onClick={() => setStep('landing')} className="text-xs uppercase tracking-widest text-amber-200/50 hover:text-amber-400">Trang chủ</button>
        <button
          onClick={() => setShowDonationModal(true)}
          className={`text-xs uppercase tracking-widest transition-all duration-300 ${isButtonGlowing
            ? 'text-amber-300 scale-110'
            : 'text-amber-200/50 hover:text-amber-400'
            }`}
        >
          🧧 Lì xì
        </button>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 z-10 flex flex-col items-center">

        {step === 'landing' && (
          <div className="text-center max-w-4xl animate-fade-in py-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-amber-500 tracking-tighter italic">Vận Mệnh 2025</h1>
            <p className="text-base md:text-xl mb-10 text-amber-200/70 font-light max-w-2xl mx-auto">
              Khám phá bản đồ cuộc đời thông qua trí tuệ nhân tạo và năng lượng vũ trụ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
              <button onClick={() => startReading(ReadingType.NEW_YEAR)} className="p-5 bg-red-800 hover:bg-red-700 text-white font-bold rounded-2xl border border-amber-500/50 shadow-lg transition-transform hover:scale-105">🧧 BÓI ĐẦU NĂM (AI)</button>
              <button onClick={() => startReading(ReadingType.NUMEROLOGY)} className="p-5 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-2xl border border-amber-500/50 shadow-lg transition-transform hover:scale-105">🔢 THẦN SỐ HỌC (AI)</button>
              <button onClick={() => startReading(ReadingType.SINGLE)} className="p-5 bg-amber-700 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg transition-transform hover:scale-105">🔮 BỐC ĐẠI 1 LÁ</button>
              <button onClick={() => startReading(ReadingType.THREE_CARD)} className="p-5 border-2 border-amber-600 hover:bg-amber-600/10 text-amber-400 font-bold rounded-2xl transition-transform hover:scale-105">✨ TRẢI BÀI 3 LÁ</button>
            </div>
          </div>
        )}

        {(step === 'personalInfo') && (
          <div className="w-full max-w-lg animate-zoom-in pt-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-amber-500/30 p-6 md:p-10 rounded-[2rem] shadow-2xl">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center mystic-font text-amber-500 uppercase tracking-widest">Khởi Tâm Nhập Liệu</h2>
              <form onSubmit={handlePersonalInfoSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-amber-500/70 mb-2 uppercase tracking-[0.2em]">Họ và tên</label>
                  <input type="text" value={userInfo.fullName} onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })} placeholder="Nguyễn Văn A" className="w-full bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 text-amber-100 focus:border-amber-500 outline-none" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-amber-500/70 mb-2 uppercase tracking-[0.2em]">Ngày tháng năm sinh</label>
                    <input type="text" value={userInfo.dob} onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })} placeholder="01/01/1990" className="w-full bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 text-amber-100 focus:border-amber-500 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-500/70 mb-2 uppercase tracking-[0.2em]">Giờ sinh (nếu có)</label>
                    <input type="text" value={userInfo.birthTime} onChange={(e) => setUserInfo({ ...userInfo, birthTime: e.target.value })} placeholder="14:30" className="w-full bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 text-amber-100 focus:border-amber-500 outline-none" />
                  </div>
                </div>
                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                <button type="submit" className="w-full py-4 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-xl uppercase tracking-widest text-sm">Xem Kết Quả AI</button>
              </form>
            </div>
          </div>
        )}

        {step === 'question' && (
          <div className="w-full max-w-lg animate-zoom-in pt-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-amber-500/30 p-8 rounded-[2rem] shadow-2xl text-center">
              <h2 className="text-xl font-bold mb-6 mystic-font text-amber-500 uppercase tracking-widest">Bạn đang băn khoăn điều gì?</h2>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Hãy viết câu hỏi của bạn tại đây..." className="w-full h-32 bg-slate-950/80 border border-amber-900/50 rounded-xl p-4 text-amber-100 focus:border-amber-500 outline-none resize-none mb-6" />
              <button onClick={goToPickingStep} className="w-full py-4 bg-amber-600 text-slate-900 font-bold rounded-xl uppercase tracking-widest text-sm">Tiến Đến Chọn Bài</button>
            </div>
          </div>
        )}

        {step === 'picking' && (
          <div className="w-full max-w-5xl animate-fade-in flex flex-col items-center py-4">
            <h2 className="text-2xl md:text-3xl font-bold mystic-font text-amber-500 mb-2 uppercase tracking-widest text-center">Hãy Chọn {requiredCount} Lá Bài</h2>
            <p className="text-amber-200/50 text-xs mb-10 text-center uppercase tracking-[0.3em]">Tập trung ý niệm • Đã chọn: {selectedCards.length}/{requiredCount}</p>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 md:gap-5 mb-12 max-h-[55vh] overflow-y-auto p-4 w-full custom-scrollbar">
              {shuffledDeck.map((card, idx) => {
                const isSelected = selectedCards.some(sc => sc.card.id === card.id);
                const selectionOrder = selectedCards.findIndex(sc => sc.card.id === card.id) + 1;
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleSelectCard(card.id)}
                    className={`
                      relative aspect-[2/3] cursor-pointer rounded-xl border-2 transition-all duration-300 transform group
                      ${isSelected
                        ? 'border-amber-400 scale-105 -translate-y-2 shadow-[0_0_30px_rgba(251,191,36,0.5)] z-10'
                        : 'border-amber-900/40 hover:border-amber-500/60 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                      }
                    `}
                    style={{ animationDelay: `${idx * 0.01}s` }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-2 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-1 border border-amber-900/30 rounded-lg pointer-events-none"></div>
                      <div className={`w-8 h-8 md:w-10 md:h-10 border border-amber-500/20 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-amber-500/10' : ''}`}>
                        <div className={`w-1 h-1 bg-amber-500 rounded-full ${isSelected ? 'animate-ping' : 'opacity-30'}`}></div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 w-7 h-7 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xs shadow-xl border-2 border-slate-950 z-20 animate-zoom-in">
                        {selectionOrder}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={`transition-all duration-700 w-full flex justify-center pb-10 ${selectedCards.length === requiredCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button
                onClick={getInterpretation}
                className="px-16 py-5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold rounded-full shadow-[0_0_50px_rgba(251,191,36,0.3)] uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all"
              >
                Khai Mở Định Mệnh
              </button>
            </div>
          </div>
        )}

        {step === 'reading' && readingResult && (
          <div className="w-full max-w-4xl space-y-8 pb-20 animate-fade-in">
            {!isNoCardsInUI && (
              <div className="flex flex-wrap justify-center gap-6">
                {selectedCards.map((sc, i) => (
                  <TarotCardView key={sc.card.id} selectedCard={sc} index={i} revealAll={true} />
                ))}
              </div>
            )}

            <div className="bg-slate-900/50 border border-amber-500/20 p-6 md:p-12 rounded-[2.5rem] shadow-2xl relative mt-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-800 text-white px-8 py-2.5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] border border-amber-500 shadow-xl">
                {readingType === ReadingType.NEW_YEAR ? 'Vận Hạn 2025' : (readingType === ReadingType.NUMEROLOGY ? 'Thần Số Học' : 'Thông Điệp')}
              </div>

              {readingResult.mysticQuote && (
                <div className="text-center mb-10 pt-6">
                  <p className="text-amber-400/90 italic text-lg md:text-2xl font-serif px-4">
                    "{readingResult.mysticQuote}"
                  </p>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto mt-6"></div>
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-amber-500/60 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Tổng Quan</h3>
                <p className="text-amber-100 text-2xl md:text-3xl font-light italic leading-relaxed">
                  {readingResult.summary}
                </p>
              </div>

              {readingResult.sections ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                  {readingResult.sections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-6 md:p-8 rounded-[2rem] border border-amber-900/20 group hover:border-amber-500/40 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform">{sec.icon}</span>
                        <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm">{sec.title}</h4>
                      </div>
                      <p className="text-amber-100/80 text-base leading-relaxed font-light">{sec.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-10 text-amber-100/90 leading-relaxed whitespace-pre-wrap md:text-xl font-light">
                  {readingResult.interpretation}
                </div>
              )}

              <div className="bg-amber-900/10 p-8 rounded-[2rem] border border-amber-500/20 mb-10">
                <h4 className="text-amber-500 font-bold uppercase text-[10px] mb-4 tracking-[0.3em]">Lời khuyên dẫn lối</h4>
                <p className="text-amber-200/90 italic text-lg leading-relaxed">{readingResult.advice}</p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-amber-900/30">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/40 font-bold">Con số may mắn</span>
                  <div className="flex gap-4">
                    {readingResult.luckyNumbers.map((n, i) => (
                      <div key={i} className="w-10 h-10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-base shadow-lg bg-slate-950/50">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep('landing')} className="px-8 py-3 bg-slate-900 text-amber-500/80 hover:text-amber-400 font-bold uppercase tracking-widest text-xs border border-amber-900/40 rounded-full transition-all">Quay về</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-10 text-center text-amber-500/10 text-[9px] md:text-[11px] tracking-[0.4em] font-medium uppercase mt-auto">
        Mystic Tarot AI &copy; 2025 • Trí Tuệ Nhân Tạo & Tâm Linh Huyền Bí
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.1); border-radius: 10px; }
        
        @keyframes loading-bar {
          0% { width: 0%; opacity: 0.5; }
          50% { width: 70%; opacity: 1; }
          100% { width: 95%; opacity: 0.8; }
        }
      `}</style>
      <DonationModal
        intervalSeconds={10}
        open={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </div>
  );
};

export default Home;