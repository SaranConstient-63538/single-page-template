import axios from 'axios'

const token =localStorage.getItem('token')
const instance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json", 
        Authorization :`Bearer ${token}`
    },
})

export default instance


 