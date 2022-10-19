
    const getAccessToken =()=>{
        const token = localStorage.getItem("token")
        return token;
    }
    const removeAccessToken =()=>{
        localStorage.removeItem('token');     
    }
    const setAccessToken =(token)=>{
        localStorage.setItem('token',JSON.stringify(token));      
    }
    const setUser=(data)=>{
        const _data = JSON.stringify(data)
        localStorage.setItem('data', _data);
    }
    const getUser =()=>{
        return JSON.parse(localStorage.getItem('user'))
    }
    const removeUser =()=>{
        localStorage.removeItem('user')
        localStorage.clear()
    }
    export let tokenService =  { 
        getAccessToken,
        setUser,
        getUser,
        removeUser,
        removeAccessToken,
        setAccessToken
    }
