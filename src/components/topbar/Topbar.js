import React from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import * as Ai from 'react-icons/ai'
import logoImg from '../../assets/images/cgslogo.png'
import SearchBarTop from './SearchBarTop';
import './topbar.css';
import { useNavigate } from 'react-router-dom'
import {NotificationsNoneOutlined,  MessageOutlined} from '@mui/icons-material';
import instance from '../../service/service'

const Topbar = ({handleShow}) => {   
    const navigate = useNavigate();
    const Logout =()=>{
        console.log(process.env, instance.post(process.env.REACT_APP_LOGOUT))
        instance.post(process.env.REACT_APP_LOGOUT)
        .then( res =>{            
            console.log(res.data);
            // if( res.status === 200){
                // localStorage.removeItem('token')
                // localStorage.removeItem('data')
                // localStorage.clear();
                // const logout = JSON.parse(localStorage.getItem('token'))
                // console.log(logout);
                // navigate('/')
            // }
            
        localStorage.removeItem('token')
        localStorage.removeItem('data')
        navigate('/') 
    })}
    return (
        <Navbar expand="md"  className="shadow topbar bg-white py-0 px-0 mt-0 flex-row position-fixed w-100">              
            <div className='navbar-brand-wrapper '>
                <Navbar.Brand href="#home" className="logoIcon text-center">
                    <img src={logoImg} alt="logo"  className='text-sm-center'/>
                </Navbar.Brand> 
            </div>  
            <Button className="btn text-white rounded-4 menubox-btn" onClick={handleShow}>                   
                <Ai.AiOutlineMenu aria-controls="#basic-navbar-nav" size={20} /> 
            </Button>               
            <Navbar.Collapse id="basic-navbar-nav d-md-block">                
                <SearchBarTop />
                <Nav className="ms-auto flex-sm-column flex-md-row">                     
                    <div className='d-flex justify-content-between py-2 px-4 align-items-center'>
                        <Nav.Item className="p-2">
                            <Nav.Link href="#link" className='mssg-btn'>
                                {/* <MessageOutlined /> */}
                                <span className='fs-4'><i class="bi bi-chat"></i></span>
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item className="p-2"   >
                            <Nav.Link href="#link" className='notify-btn'>
                                {/* <NotificationsNoneOutlined  className="dropdown-toggle"/> */}
                                <span className='fs-4'><i class="bi bi-bell"></i></span>
                            </Nav.Link>
                        </Nav.Item>                           
                        <Nav.Item>
                            <Nav.Link >   
                                <Dropdown>
                                    <Dropdown.Toggle className='logtog-btn border-0 rounded-circle'>
                                        <Ai.AiOutlinePoweroff size={20}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  align="end">
                                        <Dropdown.Item onClick={Logout} > 
                                            <div className="w-100">Logout</div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>    
                                </Dropdown>
                            </Nav.Link>
                        </Nav.Item>
                    </div>  
                </Nav>
            </Navbar.Collapse>  
        </Navbar>
    )
}
export default Topbar