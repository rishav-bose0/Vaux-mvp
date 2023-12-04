import {
    VAUX_SAMPLE_VOICE_LIST_TYPE,
    VAUX_LOGIN,
    VAUX_SIGNUP,
    VAUX_VOICE_LIST_TYPE,
    VAUX_VOICE_PREVIEW_TYPE,
    VAUX_PROCESS_TTS,
    VAUX_PROJECTS_LIST,
    VAUX_USER_DETAIL_TYPE,
    VAUX_CREATE_PROJECT,
    VAUX_FETCH_PROJECT_DETAILS,
    VAUX_UPDATE_USER, VAUX_CLONE_VOICE
} from "utils/APITypes";
import {
    VAUX_AI_VOICES_PREVIEW_RESPONSE,
    VAUX_AI_VOICES_RESPONSE,
    VAUX_GENERATE_TTS,
    VAUX_LOGIN_RESPONSE,
    VAUX_PROJECTS_LIST_RESPONSE,
    VAUX_TTS_RESPONSE,
    VAUX_UPDATE_USER_RESPONSE,
    VAUX_USER_DETAIL_RESPONSE,
    VAUX_CLONE_VOICE_RESPONSE
} from "utils/APIResponseTypes";
import {vauxAPI} from "utils/NetworkInstance";
import {environment} from "../environment/environment";

const { baseURL } = environment || {};

export const login = async (loginForm: any) => {
    try {
        const response = await vauxAPI().post<VAUX_LOGIN_RESPONSE>(VAUX_LOGIN, loginForm);
        const {data} = response || {};
        if (data) {
            return data;
        }

    } catch (error: any) {
        console.log(error.data);
        return error.data
    }
}

export const userSignup = async (signupForm: any) => {
    try {
        const response = await vauxAPI().post<VAUX_LOGIN_RESPONSE>(VAUX_SIGNUP, signupForm);
        const {data} = response;
        if (response.status === 200 && data) {
            return data;
        }
    } catch (error: any) {
        console.log(error);
        return error.data;
    }
}

export const getAllAIVoiceSample = async (userID: string = "", token: string = "", sample: boolean = false) => {
    let endPoint = VAUX_VOICE_LIST_TYPE + `/${userID}`;
    if (sample) {
        endPoint = VAUX_SAMPLE_VOICE_LIST_TYPE;
    }
    try {
        const response = await vauxAPI(token).get<VAUX_AI_VOICES_RESPONSE>(endPoint);
        const {data} = response;
        if (response.status === 200 && data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const fetchAIVoicePreview = async (id: number, name: string) => {
    const token = "";
    try {
        const response = await vauxAPI(token).get<VAUX_AI_VOICES_PREVIEW_RESPONSE>(VAUX_VOICE_PREVIEW_TYPE + `${id}/${name}`);
        const {data} = response;
        if (response.status === 200 && data) {
            return data?.Preview_link;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

export const generateTTS = async (token: string = "None", ttsBody: VAUX_GENERATE_TTS[]) => {
    try {
        const response = await vauxAPI(token).post<VAUX_TTS_RESPONSE>(VAUX_PROCESS_TTS, ttsBody);
        const {data} = response;
        if (response.status === 200 && data) {
            return data?.speech_s3_link;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

export const cloneVoice = async (token: string = "None", cloneRequest: FormData) => {
    try {
        const requestOptions: RequestInit = {
            method: "POST",
            body: cloneRequest,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${baseURL}` + "/api/v1/clone_voice", requestOptions);
        if (response.ok) {
            const responseData: VAUX_CLONE_VOICE_RESPONSE = await response.json();
            return responseData.message
            // Handle the response data based on the interface structure
            // console.log(responseData.voice_clone_success); // Access properties as needed
            // console.log(responseData.message);
        } else {
            // Handle non-OK responses (errors)
            throw new Error('Request failed with status ' + response.status);
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

export const fetchProjectsListByUser = async (token: string, userId: string) => {
    try {
        const response = await vauxAPI(token).get<VAUX_PROJECTS_LIST_RESPONSE>(VAUX_PROJECTS_LIST + `/${userId}`);
        const {data} = response;
        if (response.status === 200 && data) {
            const result = Object.values(data);
            return result;
        }

    } catch (error) {
        console.log(error);
        return {Error: "Error in Fetching Details"};
    }
}
export const fetchUserDetailsById = async (userID: string, token: string = "") => {

    try {
        if (!userID.length) {
            throw new Error("Invalid User");
        }
        // const token = useLocalStorage('vaux-staff-token',JSON.stringify(null));
        const response = await vauxAPI(token).get<VAUX_USER_DETAIL_RESPONSE>(VAUX_USER_DETAIL_TYPE + userID);
        const {data} = response;
        if (response.status === 200 && data) {
            return data;
        }
    } catch (error: any) {
        console.log(error);
        return error.data;
    }
}
export const createProject = async (token: string, projectForm: { name: string, user_id: string }) => {
    try {
        const response = await vauxAPI(token).post<any>(VAUX_CREATE_PROJECT, projectForm);
        const {data} = response;
        if (response.status === 200 && data) {
            return data;
        }

    } catch (error) {
        console.log(error);
        return {Error: "Error in Creating Project"};
    }
}

export const fetchProjectDetailsById = async (token: string, projectId: string | undefined) => {
    try {
        const response = await vauxAPI(token).get(`${VAUX_FETCH_PROJECT_DETAILS}/${projectId}`);
        const {data} = response;
        if (response.status === 200 && data) {
            return data;
        }
    } catch (error) {
        console.log(error);
        return {Error: "Error in fetching details"}
    }
}

export const updateUserDetails = async (token: string, parms: object) => {
    try {
        const response = await vauxAPI(token).put<VAUX_UPDATE_USER_RESPONSE>(VAUX_UPDATE_USER, {...parms});
        const {data} = response;

        if (response.status === 200 && data) {
            if (data?.error?.length && !data.Status) {
                throw new Error(data?.error);
            }
            return true;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}
