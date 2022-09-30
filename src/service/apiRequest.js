import instance from './service'
import axios from 'axios'
import { tokenService } from './tokenService'

axios.interceptors.request.use(
    async config =>{
        const token = tokenService.getAccessToken()
        // if(token){
        //     config.headers['Authorization'] = 'Bearer' + token;
        // }
        config.headers={
            'Authorization' : `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    (response)=> {
        return response;
    },
    async err =>{
        // const originalRequest  = err.config;
        // if(err.response.status === 403 && originalRequest._retry){
        //     originalRequest._retry = true;
           

        // }
        return Promise.reject(err);
    }
)