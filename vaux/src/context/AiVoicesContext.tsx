import React, { createContext, useState } from "react";
import { VAUX_AI_VOICES } from "../utils/APIResponseTypes";

export const AiVoicesContext = createContext<{aiVoices: VAUX_AI_VOICES[], addAiVoice: (voice: VAUX_AI_VOICES[]) => void}>({aiVoices: [], addAiVoice: () => {}})

const AiVoicesProvider = ({ children }: any) => {
    const [aiVoices, setAiVoices] = useState<VAUX_AI_VOICES[]>([]);

    const addAiVoice = (voices: VAUX_AI_VOICES[]) => {
        setAiVoices([...voices]);
    }

    return <AiVoicesContext.Provider value={{ aiVoices, addAiVoice }}>{children}</AiVoicesContext.Provider>
}

export default AiVoicesProvider;