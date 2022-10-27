import React from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import * as Ai from 'react-icons/ai'
import logoImg from '../../assets/images/cgstopbar-logo.svg'
import SearchBarTop from './SearchBarTop';
import './topbar.css';
import { useNavigate } from 'react-router-dom'
import {NotificationsNoneOutlined,  MessageOutlined} from '@mui/icons-material';
import instance from '../../service/service'
import { tokenService } from '../../service/tokenService';

import { toast } from 'react-toastify'

const Topbar = ({handleShow}) => {   
    const navigate = useNavigate();
    const Logout =()=>{
        tokenService.removeAccessToken();
        instance.post(process.env.REACT_APP_LOGOUT)
        .then( res =>{    

            navigate('/')
            console.log(res.data, 'data')

        }).catch(err =>{
            toast.error(`${err.message}`,{
                position: toast.POSITION.TOP_RIGHT
              })
            console.log(err.message)
        })    
    }
    return (
        <Navbar expand="md"  className="shadow-lg topbar bg-dark py-0 px-0 mt-0 flex-row position-fixed w-100">              
            <div className='navbar-brand-wrapper '>
                <Navbar.Brand href="#home" className="logoIcon text-center">
                    <img src={logoImg} alt="logo"  className='text-sm-center'/>
                </Navbar.Brand> 
            </div> 
                <span className="btn menubox-btn fs-2 border-0" onClick={handleShow}><i class="bi bi-list"></i></span>
           
            <Navbar.Collapse id="basic-navbar-nav d-md-block">                
                <SearchBarTop />
                <Nav className="flex-sm-column flex-md-row">                     
                    <div className='d-flex justify-content-between py-2 px-4 align-items-center'>
                        <Nav.Item>
                            <Nav.Link >   
                                <Dropdown>
                                    <Dropdown.Toggle className='logtog-btn border-0 rounded-circle shadow'>
                                        <Ai.AiOutlinePoweroff size={20}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  align="end">
                                        <Dropdown.Item onClick={Logout} className="lgout-btn rounded-pill"> 
                                            <div className="w-100 text-center fw-bold text-capitalize lgout-btn rounded-pill">logout</div>
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