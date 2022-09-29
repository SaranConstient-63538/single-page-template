

export const isLogin =()=>{
    return localStorage.getItem('token') !== null?true:false;
}