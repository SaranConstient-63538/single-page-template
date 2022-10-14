import { actionType } from "./actionType";

export const refreshToken = (data)=>{
    return{
        type: actionType.REFRESH_TOKEN,
        payload: data,
    }
}
export const loginSuccess =(data)=>{
    return{
        type: actionType.LOGIN_SUCCESS,
        payload: data,
    }
}