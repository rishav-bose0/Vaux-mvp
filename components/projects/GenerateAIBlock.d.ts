import { VAUX_GENERATE_TTS } from "../../utils/APIResponseTypes";
declare function GenerateAIBlock({ blockDetail, updateBlockDetail, addNewBlocks, }: {
    blockDetail: VAUX_GENERATE_TTS;
    updateBlockDetail: (item: VAUX_GENERATE_TTS) => void;
    addNewBlocks: (items: VAUX_GENERATE_TTS[]) => void;
}): import("react/jsx-runtime").JSX.Element;
export default GenerateAIBlock;
