import axios from 'axios'
import { tokenService } from './tokenService'

// const accesToken = tokenService.getAccessToken();
const instance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    // headers: {
    //     "Content-type": "application/json", 
    //     "Authorization" :`Bearer ${accesToken}`
    // },
})


export default instance


 