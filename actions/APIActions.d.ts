import { VAUX_AI_VOICES_RESPONSE, VAUX_GENERATE_TTS } from "../utils/APIResponseTypes";
export declare const login: (loginForm: any) => Promise<any>;
export declare const userSignup: (signupForm: any) => Promise<any>;
export declare const getAllAIVoiceSample: (userID?: string, token?: string, sample?: boolean) => Promise<VAUX_AI_VOICES_RESPONSE>;
export declare const fetchAIVoicePreview: (id: number, name: string) => Promise<string>;
export declare const generateTTS: (token: string, ttsBody: VAUX_GENERATE_TTS[]) => Promise<string>;
export declare const cloneVoice: (token: string, cloneRequest: FormData) => Promise<string>;
export declare const fetchProjectsListByUser: (token: string, userId: string) => Promise<import("../utils/APIResponseTypes").VAUX_PROJECT_LIST_ITEM[] | {
    Error: string;
}>;
export declare const fetchUserDetailsById: (userID: string, token?: string) => Promise<any>;
export declare const createProject: (token: string, projectForm: {
    name: string;
    user_id: string;
}) => Promise<any>;
export declare const fetchProjectDetailsById: (token: string, projectId: string | undefined) => Promise<any>;
export declare const updateUserDetails: (token: string, params: object) => Promise<boolean>;
