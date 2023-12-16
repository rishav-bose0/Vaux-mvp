import React from "react";
import { VAUX_AI_VOICES } from "../utils/APIResponseTypes";
export declare const AiVoicesContext: React.Context<{
    aiVoices: VAUX_AI_VOICES[];
    addAiVoice: (voice: VAUX_AI_VOICES[]) => void;
}>;
declare const AiVoicesProvider: ({ children }: any) => import("react/jsx-runtime").JSX.Element;
export default AiVoicesProvider;
