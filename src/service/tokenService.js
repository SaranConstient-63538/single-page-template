
    const getAccessToken =()=>{
        const token = localStorage.getItem("token")
        return token;
    }
    const removeAccessToken =()=>{
        localStorage.removeItem('token');  
        localStorage.clear()    
    }
    const setAccessToken =(token)=>{
        localStorage.setItem('token',JSON.stringify(token));      
    }
    const setUser=(user)=>{
        localStorage.setItem('user', JSON.stringify(user));
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
