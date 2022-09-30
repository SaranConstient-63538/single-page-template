import React from 'react';
import { Navbar, Nav, Button, Dropdown, Container,DropdownButton } from 'react-bootstrap'
import * as Ai from 'react-icons/ai'
// import logoImg from '../../asset/images/stickylogo.png'
import logoImg from '../../assets/images/cgslogo.png'
import SearchBarTop from './SearchBarTop';
import adminLogo from '../../assets/images/admin.png';
import { DashboardOutlined, Person2Outlined } from '@mui/icons-material';
import './topbar.css';
import { useNavigate } from 'react-router-dom'

import {NotificationsNoneOutlined, ExitToAppOutlined, MessageOutlined} from '@mui/icons-material';


const Topbar = ({handleShow}) => {   
    const navigate = useNavigate();
    const Logout =()=>{
        localStorage.removeItem('token')
        navigate('/');
    }
  return (
        <Navbar sticky="top" expand="md"  className="shadow-sm topbar bg-white py-0 px-0 mt-0 flex-row">              
            <div className='navbar-brand-wrapper '>
                <Navbar.Brand href="#home" className="logoIcon text-center">
                    <img src={logoImg} alt="logo"  className='text-sm-center'/>
                </Navbar.Brand> 
            </div>  
            <Button className="btn btn-primary text-white rounded-4 " onClick={handleShow}>                   
                <Ai.AiOutlineMenu aria-controls="#basic-navbar-nav" size={20} /> 
            </Button>               
            <Navbar.Collapse id="basic-navbar-nav d-md-block">                
                <SearchBarTop />
                <Nav className="ms-auto flex-sm-column flex-md-row">                     
                    <div className='d-flex justify-content-between py-2 px-4'>
                        <Nav.Item>
                            <Nav.Link href="#link">
                                <MessageOutlined />
                            </Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link href="#link">
                                <NotificationsNoneOutlined  className="dropdown-toggle"/>
                            </Nav.Link>
                        </Nav.Item>                           
                        <Nav.Item>
                            <Nav.Link >   
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        <Ai.AiOutlinePoweroff size={20}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  align="end" >
                                        {/* <Dropdown.Item>Active Log</Dropdown.Item> */}
                                        <Dropdown.Item> 
                                            <div onClick={Logout} className="w-100 btn-primary">Logout</div>
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