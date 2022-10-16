import axios from 'axios'
// import { tokenService } from './tokenService'


// const token = tokenService.getAccessToken()
const token = localStorage.getItem('token')
const instance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json", 
        Authorization :`Bearer ${token}`
    },
})
// instance.defaults.headers.common.Authorization =`Bearer ${token}`
export default instance


 