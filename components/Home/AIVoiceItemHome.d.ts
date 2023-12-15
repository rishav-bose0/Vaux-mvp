import React from "react";
interface AIVoiceItemHomePropsInterface {
    AIVoiceItem: {
        Gender: string;
        Name: string;
        Id: number;
        Img_url: string;
        img_id: string;
        Language: string;
        Emotion: Array<string>;
        Country: string;
        Preview_link: string;
    };
    isAudioPlaying: number;
    setIsAudioPlaying: React.Dispatch<React.SetStateAction<number>>;
}
declare const AIVoiceItemHome: (props: AIVoiceItemHomePropsInterface) => import("react/jsx-runtime").JSX.Element;
export default AIVoiceItemHome;
