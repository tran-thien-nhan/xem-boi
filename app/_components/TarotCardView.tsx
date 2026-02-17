"use client"
import React, { useState, useEffect } from 'react';
import { SelectedCard } from '../types';

interface TarotCardViewProps {
    selectedCard: SelectedCard;
    index: number;
    revealAll: boolean;
}

const TarotCardView: React.FC<TarotCardViewProps> = ({ selectedCard, index, revealAll }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { card, isReversed, positionName } = selectedCard;

    useEffect(() => {
        if (revealAll) {
            const timer = setTimeout(() => {
                setIsFlipped(true);
            }, index * 250 + 200); // Đã giảm delay để lật bài nhanh hơn
            return () => clearTimeout(timer);
        }
    }, [revealAll, index]);

    const handleManualFlip = () => {
        if (!revealAll) setIsFlipped(true);
    };

    return (
        <div className="flex flex-col items-center gap-3 animate-zoom-in" style={{ animationDelay: `${index * 0.05}s` }}>
            {positionName && (
                <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mystic-font">
                    {positionName}
                </span>
            )}

            <div
                onClick={handleManualFlip}
                className={`card-flip w-32 h-52 md:w-44 md:h-72 cursor-pointer ${!isFlipped ? 'hover:scale-105 transition-transform' : ''}`}
            >
                <div className={`card-inner relative w-full h-full shadow-2xl ${isFlipped ? 'card-flipped' : 'animate-float'}`}
                    style={{ animationDelay: `${index * 0.3}s` }}>
                    {/* Back of Card */}
                    <div className="card-face card-back absolute w-full h-full overflow-hidden flex flex-col items-center justify-center bg-slate-900 border-amber-500/50">
                        <div className="w-10 h-10 border border-amber-500/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Front of Card */}
                    <div className="card-face card-front absolute w-full h-full overflow-hidden flex flex-col border-amber-500/50 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <div className={`relative flex-1 overflow-hidden ${isReversed ? 'rotate-180' : ''}`}>
                            <img
                                src={card.imageUrl}
                                alt={card.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-2 bg-slate-950 text-center">
                            <h3 className="text-amber-200 text-[10px] md:text-xs font-bold mystic-font truncate">{card.name}</h3>
                            <p className="text-amber-500/60 text-[8px] italic mt-0.5 uppercase tracking-widest">
                                {isReversed ? 'Nghịch' : 'Thuận'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarotCardView;
