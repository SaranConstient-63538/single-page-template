import React,{ useState } from "react";
// import logimage from "../assets/images/logimage.svg";
import cgsimg from "../assets/images/cgslogo.png";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
// import { isLogin }  from './isLogin';
import '../App.css';

import {useNavigate} from 'react-router-dom'
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";

// import * as Ai from 'react-icons/ai'
import instance from "../service/service";
 // import  { motion } from 'framer-motion'
// import { toast } from 'react-toastify'
// import { tokenService } from '../service/tokenService'

const schema = yup.object().shape({
  email: yup.string().email('must be valid e-mail address').required('E-mail is required'),
  password: yup.string().required('password is required'),
  newpassword: yup.string().required("New Password is required"),
  confirmpassword: yup.string().required("New Password is required").oneOf([yup.ref('newpassword')],"New password does not match"),
})

const ResetForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState:{errors},reset} = useForm({
    resolver: yupResolver(schema)
  });
  const[pwdshow,setPwdShow]=useState(false);
  const[newpwdshow,setNewpwdShow]=useState(false);
  const[confrompwdshow,setConformpwdShow]=useState(false);

const handlePwdShow=()=>{
  setPwdShow(!pwdshow)
}
const handleNewPwdShow=()=>{
  setNewpwdShow(!newpwdshow)
}
const handleConformPwdShow=()=>{
  setConformpwdShow(!confrompwdshow)
}
  
  const onSubmit = (data)=>{        
    let reset_data={
      email:data.email,
      password:data.password,
      changePassword: data.newpassword,
      confirmPassword: data.confirmpassword,      
    }
    instance.post(process.env.REACT_APP_PASSWORD_CHANGE,reset_data)
    .then( res =>{
      console.log(res.data)
      navigate('/')
      reset()
    })
    console.log(reset_data)
    
    
  }   
  return (        
    <Form className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
            <img src={cgsimg} alt="cgs icon" className="fs-3 px-3 py-2" />
        </div>
        
        <div className=" text-center mx-5 px-5 py-2 position-relative">
            <span className="mailinput position-absolute">
              <img src={mailicon} className="mailcon" alt="mail icon"/>
            </span>
            <input type="text" 
                {...register('email')}
                placeholder="Email" 
                className="log-input form-control border-0 shadow-none rounded-pill text-center"
            />
            <p className="text-danger m-2">{errors.email?.message}</p>
        </div>
        <div className="text-center mx-5 px-5 py-2 position-relative">
            <span className="mailinput position-absolute">
              <img src={passwordicon} className="passcon" alt="password icon" />
            </span>
            <span className="btn mailinput1 position-absolute border-0" 
              onClick={handlePwdShow}
            >
              <img src={passwordshow} className="passshowcon"  alt="password eye icon"/>
            </span>
            <input type={pwdshow?"text":"password"}
              {...register('password')}
              className="log-input form-control border-0 shadow-none rounded-pill text-center" 
              placeholder="Password"                 
            />   
            <p className="text-danger m-0">{errors.password?.message}</p>           
        </div>
        <div className="text-center mx-5 px-5 py-2 position-relative">
            <span className="mailinput position-absolute">
              <img src={passwordicon}  className="passcon" alt="password icon"/>
            </span>
            <span className="btn mailinput1 position-absolute border-0" 
              onClick={handleNewPwdShow}
            >
              <img src={passwordshow} className="passshowcon" alt="password eye icon"/>
            </span>   
            <input type={newpwdshow?"text":"password"}
              {...register('newpassword')}
              className="log-input form-control border-0 shadow-none rounded-pill text-center" 
              placeholder="New Password"                 
            />   
            <p className="text-danger m-0">{errors.newpassword?.message}</p>           
        </div>
        <div className="text-center mx-5 px-5 py-2 position-relative">
            <span className="mailinput position-absolute">
              <img src={passwordicon}  className="passcon" alt="password icon"/>
            </span>
            <span className="btn mailinput1 position-absolute border-0" 
              onClick={handleConformPwdShow}
            >
              <img src={passwordshow} className="passshowcon" alt="pass show icon"/>
            </span>   
            <input type={confrompwdshow?"text":"password"}
              {...register('confirmpassword')}
              className="log-input form-control border-0 shadow-none rounded-pill text-center" 
              placeholder=" ConfirmPassword"                 
            />   
            <p className="text-danger m-0">{errors.confirmpassword?.message}</p>           
        </div>
        <div className="text-center py-4 mb-2">
            <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">Reset</button>
        </div>
        </Form>
  );
};

export default ResetForm;