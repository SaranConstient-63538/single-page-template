import axios from 'axios'

    const token = localStorage.getItem('token')
 const instance = axios.create({
    baseURL:'http://leave.constient.com',
    headers: {
        "Content-type": "application/json", 
        'Authorization':`Bearer ${token}`,

    },
})

export default instance
