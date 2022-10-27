import React,{useEffect, useState} from "react";
//other library
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Form, Container } from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import * as Bs from 'react-icons/bs';
import { toast } from 'react-toastify';

// images and svg 
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";
import logimage from "../assets/images/logimage.svg";
import cgsimg from "../assets/images/cgslogo.png";

//api and components and css file
import instance from "../service/service";
import { isLogin }  from './isLogin';
import ResetForm from "./ResetForm";
import '../App.css';

const LoginForm = () => {
  const navigate = useNavigate();  
  const schema = yup.object().shape({
    email: yup.string().email('must be valid e-mail address').required('* E-mail is required'),
    password: yup.string().required('* password is required'),
  });
  const { handleSubmit, register, formState:{errors},reset} = useForm({
    resolver: yupResolver(schema)
  });
  const [pwdreset, setPwdreset]=useState(false)
  const[show,setShow]=useState(false); 

  const handleShow=()=>{
    setShow(!show)
  }
  
  useEffect(()=>{
    if(isLogin()){
      navigate('/home');
    }
  },[navigate])

  const onSubmit = (data)=>{        
    let login_data={
      email:data.email,
      password:data.password,
    }    
    instance.post(process.env.REACT_APP_LOGIN,login_data).then( res =>{ 
      if( res.status === 200){
        console.log(res,res.data.responseResult.token)
        localStorage.setItem('token',res.data.responseResult.token)
        localStorage.setItem('data',JSON.stringify( res.data.responseResult))
        navigate('/home') 
        
        reset();
      }      
    }).catch( error => {
      console.log(error)
      toast.error(`${error.response.data.message}`,{
        position: toast.POSITION.TOP_RIGHT
      })
    })    
    
  }   
  return (    
    <Container>
      {/* {(isLogin())&&navigate('/home')} */}
      <div className="row my-md-5 py-md-5">
        <div className="col-md-6 col-12 align-self-center text-center">
          <div className="w-auto h-auto my-3 my-md-0">
            <img src={logimage} className="w-100 h-100" alt="Emp logo"/>
          </div>
        </div>
        <div className="col-md-6 col-12 align-self-center text-center h-auto">
          {
            pwdreset ? <ResetForm /> :
            <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
              <img src={cgsimg} alt="cgs logo" className="fs-3 px-3 py-2" />
            </div>
            
            <div className=" text-center mx-5 px-5 py-2 position-relative">
              <span className="mailinput position-absolute">
                <img src={mailicon} className="mailcon" alt="mail icon" />
              </span>
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                className="log-input form-control border-0 shadow-none rounded-pill text-center"
              />
              <p className="text-danger m-2">{errors.email?.message}</p>
            </div>
            <div className="text-center mx-5 px-5 py-2 position-relative">
              <span className="mailinput position-absolute">
                <img src={passwordicon} className="passcon" alt="password icon" />
              </span>
              <span
                className="btn mailinput1 position-absolute border-0"
                onClick={handleShow}
              >
                <img src={passwordshow} className="passshowcon"  alt="password eye icon"/>
              </span>
              <input
                type={show ? "text" : "password"}
                {...register("password")}
                className="log-input form-control border-0 shadow-none rounded-pill text-center"
                placeholder="Password"
              />
              <p className="text-danger m-0">{errors.password?.message}</p>
            </div>
            <div className="text-center py-4 mb-2">
              <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
            </div>
            <Link className="my-3" to="/reset" onClick={()=>setPwdreset(!pwdreset)}> <Bs.BsKeyFill /> reset password</Link>
          </Form>
          }
          
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;