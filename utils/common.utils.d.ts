import { VAUX_AI_VOICES_RESPONSE } from "./APIResponseTypes";
export declare const formatAIVoicesResponseForLanding: (voices: VAUX_AI_VOICES_RESPONSE, MaleCount?: number, FemaleCount?: number) => {
    img_id: string;
    Gender: string;
    Name: string;
    Id: number;
    Img_url: string;
    Language: string;
    Emotion: string[];
    Country: string;
    Preview_link: string;
    Type: string;
}[];
export declare const decodeToken: (token: string) => void;
