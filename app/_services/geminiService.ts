import { GoogleGenAI, Type } from "@google/genai";
import { ReadingResult, ReadingType, SelectedCard, UserInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function getTarotReading(
    selectedCards: SelectedCard[],
    readingType: ReadingType,
    userQuestion: string = "Tôi muốn biết về năng lượng của mình lúc này.",
    userInfo?: UserInfo
): Promise<ReadingResult> {
    const isNewYear = readingType === ReadingType.NEW_YEAR;
    const isNumerology = readingType === ReadingType.NUMEROLOGY;
    const isHoroscope = readingType === ReadingType.HOROSCOPE;

    let personalContext = "";
    if (userInfo) {
        personalContext = `Thông tin: ${userInfo.fullName}, sinh ngày ${userInfo.dob}${userInfo.birthTime ? `, lúc ${userInfo.birthTime}` : ''}.`;
    }

    const hiddenEnergy = selectedCards.length > 0 ?
        `Năng lượng ẩn: ${selectedCards.map(sc => sc.card.name).join(', ')}.` : "";

    let prompt = "";

    if (isNewYear) {
        prompt = `Bạn là bậc thầy Chiêm tinh 2025. ${personalContext} ${hiddenEnergy}
      Nhiệm vụ: Luận vận hạn 2026 súc tích, sâu sắc. 
      Yêu cầu: 
      - Không nhắc chữ "Tarot". Dùng "năng lượng bản mệnh".
      - 4 phần 'sections': Gia Đạo (🏠), Sự Nghiệp (💼), Tài Lộc (💰), Sức Khỏe (🌿).
      - 'mysticQuote': 1 câu triết lý ngắn.
      - Trả về JSON.`;
    } else if (isNumerology) {
        prompt = `Chuyên gia Thần số học Pythagoras. ${personalContext}
      Nhiệm vụ: Giải mã 3 chỉ số (Chủ đạo, Linh hồn, Sứ mệnh).
      - 'sections': Tính cách (👤), Sự nghiệp (🚀), Tình duyên (💖).
      - Trả về JSON.`;
    } else if (isHoroscope) {
        prompt = `Bạn là chuyên gia Tử Vi phương Đông. ${personalContext}
      Nhiệm vụ: Xem tử vi hàng ngày dựa trên ngày sinh.
      - 'sections': Sự nghiệp/Công việc (💼), Tài chính (💰), Tình cảm/Gia đình (💖), Sức khỏe (🌿).
      - Mỗi phần có nội dung ngắn gọn, sâu sắc.
      - 'mysticQuote': 1 câu châm ngôn về vận mệnh.
      - Trả về JSON.`;
    } else {
        let cardsDescription = selectedCards.map((sc, idx) => `Lá ${idx + 1}: ${sc.card.name} (${sc.isReversed ? "Nghịch" : "Thuận"})`).join(", ");
        prompt = `Bậc thầy Tarot. Câu hỏi: "${userQuestion}". ${cardsDescription}. ${personalContext}
      Yêu cầu: Luận giải sâu sắc, súc tích. Trả về JSON.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        interpretation: { type: Type.STRING },
                        sections: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    content: { type: Type.STRING },
                                    icon: { type: Type.STRING }
                                }
                            }
                        },
                        advice: { type: Type.STRING },
                        luckyNumbers: {
                            type: Type.ARRAY,
                            items: { type: Type.INTEGER }
                        },
                        mysticQuote: { type: Type.STRING }
                    },
                    required: ["summary", "advice", "luckyNumbers"]
                }
            }
        });

        if (!response.text) {
            throw new Error("Không nhận được phản hồi từ Gemini");
        }

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Vũ trụ đang bận xử lý dòng năng lượng khác. Hãy thử lại sau giây lát!");
    }
}