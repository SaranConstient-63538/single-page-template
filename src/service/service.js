import axios from 'axios'

 const axiosInstance = axios.create({
    baseURL:'http://leave.constient.com',
    headers: {
        "Content-type": "application/json",
        
    },
})

export default axiosInstance
