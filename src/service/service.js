import axios from 'axios'
import { tokenService } from './tokenService'


const instance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json", 
        Authorization :`Bearer ${localStorage.getItem('token')}`
    },
})


export default instance


 