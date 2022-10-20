import React,{useEffect, useState} from "react";
import logimage from "../assets/images/logimage.svg";
import cgsimg from "../assets/images/cgslogo.png";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import '../App.css';

import {useNavigate} from 'react-router-dom'
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";

import * as Ai from 'react-icons/ai'
import {useForm} from 'react-hook-form'
import { Form, Container, Col, Row, InputGroup } from 'react-bootstrap'
import instance from "../service/service";
import { isLogin } from "./isLogin";
import  { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { tokenService } from '../service/tokenService'

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
    setShow(!show)
  }
  // const handleReset=()=>{
  //   setReset(true)
  // }
  
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
      <div className="form-bg position-absolute"></div>
      {/* {(isLogin())&&navigate('/home')} */}
      <div className="row my-md-5 py-md-5">
        <div className="col-md-6 col-12 align-self-center text-center">
          <div className="w-auto h-auto my-3 my-md-0">
            <img src={logimage} className="w-100 h-100" alt="Employee image" />
          </div>
        </div>
        <div className="col-md-6 col-12 align-self-center text-center">
          <Form
            className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0 bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
              <img src={cgsimg} alt="cgs image" className="fs-3 px-3 py-2" />
            </div>
            <div className=" text-center mx-5 px-5 py-2 position-relative">
              <span className="mailinput position-absolute">
                <img src={mailicon} className="mailcon" />
              </span>
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                className="log-input form-control border-0 shadow-none rounded-pill text-center"
              />
              <p className="text-danger m-0">{errors.email?.message}</p>
            </div>
            <div className="text-center mx-5 px-5 py-2 position-relative">
              <span className="mailinput position-absolute">
                <img src={passwordicon} className="passcon" />
              </span>
              <span
                className="btn mailinput1 position-absolute border-0"
                onClick={handleShow}
              >
                <img src={passwordshow} className="passshowcon" />
              </span>
              <input
                type={show ? "text" : "password"}
                {...register("password")}
                className="log-input form-control border-0 shadow-none rounded-pill text-center"
                placeholder="Password"
              />
              <p className="text-danger m-0">{errors.password?.message}</p>
            </div>
            <div className="text-center py-4">
              <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">
                login
              </button>
            </div>

            {/* <div className="pb-4">
              <a
                href="#"
                className="text-decoration-none fw-bold"
              >
                <i class="bi bi-key-fill pe-1"></i>reset password
              </a>
            </div> */}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;