
export enum ReadingType {
    SINGLE = 'SINGLE',
    THREE_CARD = 'THREE_CARD',
    NEW_YEAR = 'NEW_YEAR',
    NUMEROLOGY = 'NUMEROLOGY'
}

export interface UserInfo {
    fullName: string;
    dob: string;
    birthTime: string;
}

export interface TarotCard {
    id: string;
    name: string;
    arcana: 'Major' | 'Minor';
    meaningUpright: string;
    meaningReversed: string;
    imageUrl: string;
    description: string;
}

export interface SelectedCard {
    card: TarotCard;
    isReversed: boolean;
    positionName?: string;
}

export interface ReadingSection {
    title: string;
    content: string;
    icon: string;
}

export interface ReadingResult {
    summary: string;
    interpretation: string; // Vẫn giữ cho các kiểu bói khác
    sections?: ReadingSection[]; // Dành riêng cho bói đầu năm/thần số học
    advice: string;
    luckyNumbers: number[];
    mysticQuote?: string;
}