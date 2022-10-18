import React,{lazy, useEffect, useState} from "react";
import * as yup from 'yup';
import '../App.css';

const logimage =lazy(()=>import( '../assets/images/logimage.svg'));
const cgsimg = lazy(()=> import('../assets/images/cgslogo.png'))
const { yupResolver } = lazy(()=>import('@hookform/resolvers/yup'));



const { useNavigate } = lazy( ()=> import('react-router-dom'))
const mailicon = lazy(()=> import('../assets/images/mailicon.svg'))
const passwordicon = lazy( ()=> import('../assets/images/passwordicon.svg'))
const passwordshow = lazy(()=> import('../assets/images/passwordshow.svg'));

const { useForm } = lazy(()=>import('react-hook-form'));
const { Form, Container, Col, Row, InputGroup } = lazy(()=>import('react-bootstrap'));
const instance = lazy(()=>import("../service/service"));
const { isLogin } = lazy(()=>import('./isLogin'));
const  { motion } = lazy(()=>import('framer-motion'));
const { toast } = lazy(()=>import('react-toastify'));
const { tokenService } = lazy(()=>import('../service/tokenService'));

const schema = yup.object({
  email: yup.string().email('must be valid e-mail address').required('* E-mail is required'),
  password: yup.string().required('* password is required'),
}).required();

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const[show,setShow]=useState(false);
  const [reset,setReset]=useState(false)

  const handleShow=()=>{
    setShow(true)
  }
  const handleReset=()=>{
    setReset(true)
  }
  
  useEffect(()=>{
    if(isLogin())navigate('/home');
  },[])
  const onSubmit = (data)=>{        
    let login_data={
      email:data.email,
      password:data.password,
    }
   
    instance.post(process.env.REACT_APP_LOGIN,login_data).then( res =>{ 
      if( res.status === 200){
        tokenService.setAccessToken(res.data.responseResult)
        console.log(res.data.responseResult);
        const _data = JSON.stringify( res.data.responseResult)
        localStorage.setItem('data',_data)
        // instance.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`
        localStorage.setItem('token', res.data.responseResult.token)

        navigate('/home')     
        toast.success('Successfully Login',{       
          position: toast.POSITION.BOTTOM_LEFT,
        }) 
      }
      
    }).catch( err => {
      console.log(err.message)
    })    
    
  }   
  return (    
    <Container>
      {/* {(isLogin())&&navigate('/home')} */}
      <div className="row my-md-5 py-md-5">
        <div className="col-md-6 col-12 align-self-center text-center">
          <div className="w-auto h-auto my-3 my-md-0">
            <img src={logimage} className="w-100 h-100" alt="Employee image"/>
          </div>
        </div>
        <div className="col-md-6 col-12 align-self-center text-center">
          {reset ? (
            <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
                <img src={cgsimg} alt="cgs image" className="fs-3 px-3 py-2" />
              </div>
              <div className=" text-center m-auto py-2 position-relative">
                <span className="mailinput position-absolute"><img src={mailicon} className="mailcon"/></span>
                  <input type="text" 
                    {...register('email')}
                    placeholder="Email" 
                    className="log-input form-control border-0 shadow-none rounded-pill text-center"
                    />
                  <p className="text-danger m-0">{errors.email?.message}</p>
              </div>
              <div className="text-center m-auto py-2 position-relative">
                <span className="mailinput position-absolute">
                  <img src={passwordicon}  className="passcon" alt="password icon"/>
                </span>
                <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}>
                  <img src={passwordshow} className="passshowcon" alt="passshow icon"/>
                </span>
                <input className="log-input form-control border-0 shadow-none rounded-pill text-center"
                  {...register('password')}
                  type={show ? "text" : "password"}                  
                   placeholder="Password"                 
                />  
                <p className="text-danger m-0">{errors.password?.message}</p>   
              </div>
              <div className="text-center py-4 mb-2">
                <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
              </div>
              <a onClick={handleReset}>reset password</a>
          </Form>          
          ): <Resetpassword />}
          
        </div>
      </div>
    </Container>
  );
};
export const Resetpassword =()=>{
  const { handleSubmit, register, formState:{errors}} = useForm();
  return (
    <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
        <img src={cgsimg} alt="cgs image" className="fs-3 px-3 py-2" />
      </div>
      <div className=" text-center m-auto py-2 position-relative">
        <span className="mailinput position-absolute">
          <img src={passwordicon}  className="passcon" alt="password icon"/>
        </span>
        <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}>
          <img src={passwordshow} className="passshowcon" alt="passshow icon"/>
        </span>
        <input type="password" 
          {...register('oldpassword')}
          placeholder="Email" 
          className="log-input form-control border-0 shadow-none rounded-pill text-center"
        />
          <p className="text-danger m-0">{errors.oldpassword?.message}</p>
      </div>
      <div className=" text-center m-auto py-2 position-relative">
        <span className="mailinput position-absolute">
          <img src={passwordicon}  className="passcon" alt="password icon"/>
        </span>
        <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}>
          <img src={passwordshow} className="passshowcon" alt="passshow icon"/>
        </span>
        <input type="password" 
          {...register('newpassword',{required:true})}
          placeholder="Password" 
          className="log-input form-control border-0 shadow-none rounded-pill text-center"
        />
          <p className="text-danger m-0" {errors.newpassword?.message}>Please  </p>
      </div>
      <div className="text-center m-auto py-2 position-relative">
        <span className="mailinput position-absolute">
          <img src={passwordicon}  className="passcon" alt="password icon"/>
        </span>
        <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}>
          <img src={passwordshow} className="passshowcon" alt="passshow icon"/>
        </span>
        <input className="log-input form-control border-0 shadow-none rounded-pill text-center"
          {...register('password')}
          type={show ? "text" : "password"}                  
            placeholder="Password"                 
        />  
        <p className="text-danger m-0">{errors.password?.message}</p>   
      </div>
      <div className="text-center py-4 mb-2">
        <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
      </div>
    </Form> 
  )  
}
export default LoginForm;