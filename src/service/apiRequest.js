import { configure } from '@testing-library/react';
import instance from './service'
import { tokenService } from './tokenService'

instance.interceptors.request.use(
    async config =>{
        const token =localStorage.getItem('token')
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
            // config.headers['x-access-token'] = token;            
        }
        
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
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