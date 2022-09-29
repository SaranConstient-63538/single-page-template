import { REFRESH_TOKEN } from   './actionType';


const token = JSON.parse(localStorage.getItem('token'))
const intialState = token ? { isLoggedIn: true,token}: {isLoggedIn: false,token: null}

export const reducer =(state = intialState, action)=>{
    switch(action.type){
        case REFRESH_TOKEN:
            return{
                ...state,
                accessToken: payload,
            }
        default:
            return state;
    }
}