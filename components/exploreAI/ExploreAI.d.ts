import { VAUX_AI_VOICES } from "../../utils/APIResponseTypes";
interface ExploreAIProps {
    isSelectionRequired?: boolean;
    selectedAiVoice?: VAUX_AI_VOICES;
    SelectCallbackFunc?: (selectedAIVoice: VAUX_AI_VOICES) => void;
    handleCloseModal: () => void;
}
declare const ExploreAI: (props: ExploreAIProps) => import("react/jsx-runtime").JSX.Element;
export default ExploreAI;
