import React,{useEffect} from "react";
import loginImg from "../assets/images/loginImg.png";
import cgsimg from "../assets/images/cgslogo.png";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import '../App.css';
import {useNavigate} from 'react-router-dom'
import * as Ai from 'react-icons/ai'
import {useForm} from 'react-hook-form'
import { Form, Container, Col, Row, InputGroup } from 'react-bootstrap'
import instance from "../service/service";
import { isLogin } from "./isLogin";
import { toast } from 'react-toastify'

const schema = yup.object({
  email: yup.string().email('must be valid e-mail address').required('E-Mail is required'),
  password: yup.string().required('Password is required'),
}).required();

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });
  
  useEffect(()=>{
    if(isLogin())navigate('/home');
  },[])
  const onSubmit = (data)=>{        
    let login_data={
      email:data.email,
      password:data.password
    }    
    instance.post(process.env.REACT_APP_LOGIN,login_data).then( res =>{ 
      if( res.status === 200){
        const _data = JSON.stringify( res.data.responseResult)
        localStorage.setItem('data',_data)
        localStorage.setItem('token', res.data.responseResult.token)
        navigate('/home')
        toast.success('Successfully Login',{       
          position: toast.POSITION.TOP_RIGHT,
        })
      }else{
        console.log(res.status)
      }          
    }).catch( err => {
      toast.success(`${err.message}`,{       
        position: toast.POSITION.TOP_RIGHT,
      })
      console.log(err.message)
    })    
    
  }   
  return (    
    <Container>
      <Row className="my-5">
        <Col  md={8} sm={12} lg className="align-items-center text-center my-5 py-5">
          <div className="w-auto h-auto shadow-lg">
            <img src={loginImg} className="w-100 h-100" alt="Employee image"/>
          </div>
        </Col>
        <Col sm={12} md={5} lg className="align-items-center text-center my-5 py-5">
          <Form className="d-flex flex-column shadow-lg py-5 px-3 rounded-4 " onSubmit={handleSubmit(onSubmit)}>
            <div className="swing py-2 shadow-md m-auto rounded-4 mt-5 mb-5">
              <img src={cgsimg} alt="cgs image" className="fs-3 px-2 py-1" />
            </div>
            <div className=" text-center m-auto mb-5">
               <InputGroup>
                <InputGroup.Text><Ai.AiOutlineMail /></InputGroup.Text> 
                <Form.Control 
                  {...register('email')}
                  placeholder="E-Mail Address" 
                  className="form-control fs-6" 
                /> 
                <p className="text-danger mt-2">{errors.email?.message}</p>
              </InputGroup>
            </div>
            <div className=" text-center m-auto mb-5">
              <InputGroup>
                  <InputGroup.Text><Ai.AiOutlineLock /></InputGroup.Text> 
                <Form.Control 
                {...register('password')} type="password"
                  className="form-control" placeholder="Password"/>   
                <p className="text-danger mt-2">{errors.password?.message}</p>   
              </InputGroup>         
            </div>
            <div className="text-center m-auto mb-5 mt-5 btn-lg">
              <input type="submit" value="Submit" className="btn btn-primary btn-lg mx-3 fs-6 rounded-4"/> 
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;