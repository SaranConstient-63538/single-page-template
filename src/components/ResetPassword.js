import { useState, lazy } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
const { Form } = lazy(()=>import('react-bootstrap'));
const { toast } = lazy(()=>import('react-toastify'));
const passwordicon = lazy( ()=> import('../assets/images/passwordicon.svg'))
const passwordshow = lazy(()=> import('../assets/images/passwordshow.svg'));

const ResetPassword =()=>{
    const [old_pwdShow,setOldpwdshow]=useState(false);
    const [new_pwdShow,setNewpwdshow]=useState(false);
    const [con_pwdShow,setConpwdshow]=useState(false);
    const { handleSubmit, register, formState:{errors}} = useForm({
      resolver: yupResolver(schema)
    });
    const onSubmit =(data)=>{
      console.log(data)
    }
    const oldpwd_handleShow =()=>{
      setOldpwdshow(true)
    }
    const newpwd_handleShow =()=>{
      setNewpwdshow(true)
    }
    const conpwd_handleShow =()=>{
      setConpwdshow(true)
    }
  
    return(
      <Form
        className="d-flex flex-column shadow-lg rounded-5 my-3 my-md-0 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="swing py-1 shadow-md m-auto my-5 rounded-3">
          <img src={cgsimg} alt="cgs image" className="fs-3 px-3 py-2" />
        </div>
        <div className="text-center m-auto py-2 position-relative">
          <span className="mailinput position-absolute">
            <img src={passwordicon} className="passcon" />
          </span>
          <span
            className="btn mailinput1 position-absolute border-0"
            onClick={oldpwd_handleShow}
          >
            <img src={passwordshow} className="passshowcon" />
          </span>
          <input
            type={old_pwdShow ? "text" : "password"}
            {...register("oldpwd")}
            className="log-input form-control border-0 shadow-none rounded-pill text-center"
            placeholder="Password"
          />
          <p className="text-danger m-0">{errors.oldpassword?.message}</p>
        </div>
            
            </Form>
    )
  }