
    const getAccessToken =()=>{
        const token = localStorage.getItem("token")
        return token;
    }
    const removeAccessToken =()=>{
        localStorage.removeItem('token');     
    }
    const setAccessToken =(token)=>{
        const _token = JSON.stringify(token)
        localStorage.setItem('token',_token);      
    }
    const setUser=(data)=>{
        const _data = JSON.stringify(data)
        localStorage.setItem('data', _data);
    }
    const getUser =()=>{
        const _data =JSON.parse(localStorage.getItem('data'))
        return _data;
    }
    const removeUser =()=>{
        localStorage.removeItem('data')
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
