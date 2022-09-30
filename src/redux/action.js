import { REFRESH_TOKEN } from "./actionType";

export const refreshToken = (accessToken)=>{
    return{
        type:REFRESH_TOKEN,
        payload: accessToken,
    }
}