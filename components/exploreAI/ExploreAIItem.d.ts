import React from "react";
import { VAUX_AI_VOICES } from "../../utils/APIResponseTypes";
interface ExploreAIVoiceItemPropsInterface {
    AIVoiceItem: VAUX_AI_VOICES;
    isAudioPlaying: string;
    setIsAudioPlaying: React.Dispatch<React.SetStateAction<string>>;
    isSelectionRequired?: boolean;
    SelectCallbackFunc?: () => void;
    isAnyAudioSelected: number;
    setIsAnyAudioSelected: React.Dispatch<React.SetStateAction<number>>;
}
declare const ExploreAIVoiceItem: (props: ExploreAIVoiceItemPropsInterface) => import("react/jsx-runtime").JSX.Element;
export default ExploreAIVoiceItem;
