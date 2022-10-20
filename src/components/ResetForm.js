import React,{useEffect, useState} from "react";
import logimage from "../assets/images/logimage.svg";
import cgsimg from "../assets/images/cgslogo.png";
import { yupResolver } from '@hookform/resolvers/yup'
<<<<<<< HEAD
import * as Yup from 'yup';
=======
import * as yup from 'yup';
>>>>>>> 6a94a234d4c96be88e623a292ad6ac89295a5bfa
import { useForm } from 'react-hook-form';
import { Form, Container } from 'react-bootstrap';
import { isLogin }  from './isLogin';
import '../App.css';

import {useNavigate} from 'react-router-dom'
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";

import * as Ai from 'react-icons/ai'
import instance from "../service/service";
import  { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { tokenService } from '../service/tokenService'

<<<<<<< HEAD


const ResetForm = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().email("must be valid e-mail address").required("E-mail is required"),
    password: Yup.string().min(6).required("Password is required"),
    newpassword: Yup.string().min(6).required("Password is required"),
    conformpassword: Yup.string().min(6).required("Password is required")
    .oneOf([Yup.ref('newpassword')],"New password does not match"),
  })
 
  
=======
const schema = yup.object().shape({
  email: yup.string().email('must be valid e-mail address').required('E-mail is required'),
  password: yup.string().min(8).required('password is required'),
  newpassword: yup.string().min(8).required("New Password is required"),
  conformpassword: yup.string().min(8).required("New Password is required").oneOf([yup.ref('newpassword')],"New password does not match"),
})

const ResetForm = () => {
  const navigate = useNavigate();
>>>>>>> 6a94a234d4c96be88e623a292ad6ac89295a5bfa
  const { handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const[show,setShow]=useState(false);

const handleShow=()=>{
  setShow(!show)
}
  
<<<<<<< HEAD
  // useEffect(()=>{
  //   if(isLogin())navigate('/home');
  // },[])
=======
  useEffect(()=>{
    if(isLogin())navigate('/home');
  },[])
  
>>>>>>> 6a94a234d4c96be88e623a292ad6ac89295a5bfa
  const onSubmit = (data)=>{        
    let login_data={
      email:data.email,
      password:data.password,
<<<<<<< HEAD
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
    
        <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
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
            <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
            <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}><img src={passwordshow} className="passshowcon"/></span>   
                <input type={show?"text":"password"}
                {...register('password')}
                    className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                    />   
                <p className="text-danger m-0">{errors.password?.message}</p>           
            </div>
            <div className="text-center py-4 mb-2">
                <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
            </div>
        </Form>
        
=======
      
    }
    
    
  }   
  return (        
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
            <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
            <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}><img src={passwordshow} className="passshowcon"/></span>   
            <input type={show?"text":"password"}
            {...register('newpassword')}
                className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
            <p className="text-danger m-0">{errors.password?.message}</p>           
        </div>
        <div className="text-center m-auto py-2 position-relative">
            <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
            <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}><img src={passwordshow} className="passshowcon"/></span>   
            <input type={show?"text":"password"}
            {...register('password')}
                className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
            <p className="text-danger m-0">{errors.password?.message}</p>           
        </div>
        <div className="text-center m-auto py-2 position-relative">
            <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
            <span className="btn mailinput1 position-absolute border-0" onClick={handleShow}><img src={passwordshow} className="passshowcon"/></span>   
            <input type={show?"text":"password"}
            {...register('conformpassword')}
                className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
            <p className="text-danger m-0">{errors.password?.message}</p>           
        </div>
        <div className="text-center py-4 mb-2">
            <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
        </div>
        </Form>
>>>>>>> 6a94a234d4c96be88e623a292ad6ac89295a5bfa
  );
};

export default ResetForm;