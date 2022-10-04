import axios from 'axios'

    const token = localStorage.getItem('token')
 const instance = axios.create({
    // baseURL:'http://leave.constient.com',
    baseURL : process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-type": "application/json", 
    },
})
instance.defaults.headers.common.Authorization =`Bearer ${token}`


export default instance


 