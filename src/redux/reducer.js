import { REFRESH_TOKEN, LOGIN_SUCCESS } from   './actionType';


const token = localStorage.getItem('token')
const intialState = {
    token: token ? { isLoggedIn: true,token}: {isLoggedIn: false,token: null},
    login:{
        email:'',
        password:'',
    },
}

export const reducer =(state = intialState, action)=>{
    switch(action.type){
        case REFRESH_TOKEN:
            return{
                ...state.token,
                data: action.payload,
            }
        case LOGIN_SUCCESS:
            return{
                ...state.login,
                data:action.payload,                
            }
        default:
            return state;
    }
}