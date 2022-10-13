import { REFRESH_TOKEN, LOGIN_SUCCESS } from "./actionType";

export const refreshToken = (accessToken)=>{
    return{
        type:REFRESH_TOKEN,
        payload: accessToken,
    }
}
export const loginSuccess =(login)=>{
    return{
        type: LOGIN_SUCCESS,
        payload: login,
    }
}