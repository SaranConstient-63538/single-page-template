import React,{useEffect, useState} from "react";
import logimage from "../assets/images/logimage.svg";
import cgsimg from "../assets/images/cgslogo.png";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Form, Container } from 'react-bootstrap';
// import ResetForm from './ResetForm';
import { isLogin }  from './isLogin';
import '../App.css';

import {Link, useNavigate} from 'react-router-dom'
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";
import instance from "../service/service";
import { toast } from 'react-toastify'
import * as Bi from 'react-icons/bi'
import ResetForm from "./ResetForm";


const LoginForm = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().email("must be valid e-mail address").required("E-mail is required"),
    password: Yup.string().min(6).required("Password is required"),
  })
  const formOptions ={
    resolver: yupResolver(schema)
  }
  const { handleSubmit, register, formState} = useForm(formOptions);
  const {errors} = formState;
  const[show,setShow]=useState(false);
  const [reset, setReset] = useState(false);

const handleShow=()=>{
  setShow(!show)
}
  const handleReset =()=>{
    setReset(!reset)
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
        console.log(res)
        localStorage.setItem('token',res.data.responseResult.token)
        localStorage.setItem('data',JSON.stringify( res.data.responseResult))
        navigate('/home') 
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
      {
        reset ?
        (
          <>
            <div className="col-md-6 col-12 align-self-center text-center">
              <div className="w-auto h-auto my-3 my-md-0">
                <img src={logimage} className="w-100 h-100" alt="Employee image"/>
              </div>
            </div>
            <div className="col-md-6 col-12 align-self-center text-center">        
              <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="text-center py-4 mb-2">
                  <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">login</button>
                </div>
                <Link to="/reset" className="mb-3 mt-2" onClick={handleReset}><Bi.BiKey /> reset password</Link>
              </Form>
            </div>          
          </> 
        ):(
          <ResetForm />
        )}
        

       
      </div>
    </Container>
  );
};

export default LoginForm;