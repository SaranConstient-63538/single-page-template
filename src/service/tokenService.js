
    const getAccessToken =()=>{
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token)
        return token?.data
    }
    const setUser=(user)=>{
        console.log(JSON.stringify(user))
        localStorage.setItem('user', JSON.stringify(user));
    }
    const getUser =()=>{
        return JSON.parse(localStorage.getItem('user'))
    }
    const removeUser =()=>{
        localStorage.removeItem('user')
    }
    export let tokenService =  { 
        getAccessToken,
        setUser,
        getUser,
        removeUser,
    }
