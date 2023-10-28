// add the API response interfaces 
export interface VAUX_LOGIN_RESPONSE {
    token: string;
}
interface VAUX_AI_VOICES {
    Gender:string;
    Name:string;
    Id: string;
    img_urL: string;
};


export interface VAUX_AI_VOICES_RESPONSE extends Array<VAUX_AI_VOICES>{}
export interface VAUX_AI_VOICES_PREVIEW_RESPONSE {
    S3_link:string;
    Status:boolean;
}