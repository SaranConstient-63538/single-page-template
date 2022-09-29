import {useState, createContext, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext(null);

export const AuthProvider =({childern})=>{
    const [token, setToken] =useState(null)
    const login=()=>{
        let login_data ={
            email:'',
            password:'',
        }
        axios.post('/login',login_data)
        .then( res =>{
            setToken(res.data.token)
            console.log(res.data.token)
        })
    }
    const logout=()=>{
        setToken(token)
    }
    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {childern}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext)
}
