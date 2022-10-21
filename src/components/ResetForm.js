import React,{ useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import '../App.css';

import {useNavigate} from 'react-router-dom'
import mailicon from "../assets/images/mailicon.svg";
import passwordicon from "../assets/images/passwordicon.svg";
import passwordshow from "../assets/images/passwordshow.svg";

import * as Ai from 'react-icons/ai'
import instance from "../service/service";
import { toast } from 'react-toastify'
import { tokenService } from '../service/tokenService'



const ResetForm = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().email("must be valid e-mail address").required("E-mail is required"),
    pwd: Yup.string().min(6).required("Password is required"),
    newpwd: Yup.string().min(6).required("Password is required"),
    conformpwd: Yup.string().min(6).required("Password is required")
    .oneOf([Yup.ref('newpassword')],"New password does not match"),
  })
  
  
  const { handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const[newpwdshow,setNewpwdshow]=useState(false);
  const[pwdshow,setPwdshow]=useState(false);
  const[conformpwdshow,setConformpwdshow]=useState(false);

  const handlepwdshow=()=>{
    setPwdshow(!pwdshow)
  }
  const handlenewpwdshow=()=>{
    setNewpwdshow(!newpwdshow)
  }
  const handleconformpwdshow=()=>{
    setConformpwdshow(!conformpwdshow)
  }
  // useEffect(()=>{
  //   if(isLogin())navigate('/home');
  // },[])
  const onSubmit = (data)=>{        
    let reset_data={
      email:data.email,
      pwd:data.pwd,
      newpwd:data.newpwd,
      conformpwd: data.conformpwd,
    }
   
    instance.post(process.env.REACT_APP_PASSWORD_CHANGE,reset_data).then( res =>{ 
      if( res.status === 200){
        tokenService.setAccessToken(res.data.responseResult)
        console.log(res.data.responseResult);
        const _data = JSON.stringify( res.data.responseResult)
        localStorage.setItem('data',_data)
        // instance.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`
        localStorage.setItem('token', res.data.responseResult.token)

        navigate('/home')     
        toast.success('Successfully Login',{       
          position: toast.POSITION.TOP_RIGHT,
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
              <span className="btn mailinput1 position-absolute border-0" onClick={handlepwdshow}>
              <img src={passwordshow} className="passshowcon"/></span>   
              <input type={pwdshow ?"text":"password"}
                {...register('pwd')}
                  className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
                <p className="text-danger m-0">{errors.password?.message}</p>           
            </div>
            <div className="text-center m-auto py-2 position-relative">
              <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
              <span className="btn mailinput1 position-absolute border-0" onClick={handlenewpwdshow}>
                <img src={passwordshow} className="passshowcon" alt="password Show"/></span>   
              <input type={newpwdshow?"text":"password"}
                {...register('nwdpwd')}
                  className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
                <p className="text-danger m-0">{errors.nwdpwd?.message}</p>           
            </div>
            <div className="text-center m-auto py-2 position-relative">
              <span className="mailinput position-absolute"><img src={passwordicon}  className="passcon"/></span>
              <span className="btn mailinput1 position-absolute border-0" onClick={handleconformpwdshow}><img src={passwordshow} className="passshowcon"/></span>   
              <input type={conformpwdshow?"text":"password"}
                {...register('conformpwd')}
                  className="log-input form-control border-0 shadow-none rounded-pill text-center" placeholder="Password"                 
                />   
                <p className="text-danger m-0">{errors.conformpwd?.message}</p>           
            </div>
            <div className="text-center py-4 mb-2">
                <button className="log-button border-0 w-25 py-1 text-uppercase rounded-pill shadow">
                  Reset 
                </button>
            </div>
        </Form>
        
  );
};

export default ResetForm;