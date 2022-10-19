import React from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import * as Ai from 'react-icons/ai'
import logoImg from '../../assets/images/cgslogo.png'
import SearchBarTop from './SearchBarTop';
import './topbar.css';
import { useNavigate } from 'react-router-dom'
import {NotificationsNoneOutlined,  MessageOutlined} from '@mui/icons-material';
import instance from '../../service/service'
import { tokenService } from '../../service/tokenService';

const Topbar = ({handleShow}) => {   
    const navigate = useNavigate();
    const Logout =()=>{
        instance.post(process.env.REACT_APP_LOGOUT)
        .then( res =>{            
            // tokenService.removeAccessToken();
            // tokenService.removeUser();
            localStorage.clear('token');
            localStorage.clear('user');
            navigate('/')

        }).catch(err =>{
            console.log(err.message)
        })
        // tokenService.removeAccessToken();
        // tokenService.removeUser();
        // console.log(tokenService.removeAccessToken())
        // console.log(tokenService.removeUser())
        navigate('/')       
    }
    return (
        <Navbar expand="md"  className="shadow-lg topbar bg-dark py-0 px-0 mt-0 flex-row position-fixed w-100">              
            <div className='navbar-brand-wrapper '>
                <Navbar.Brand href="#home" className="logoIcon text-center">
                    <img src={logoImg} alt="logo"  className='text-sm-center'/>
                </Navbar.Brand> 
            </div>  
            {/* <Button className="btn text-white menubox-btn" onClick={handleShow}>                    */}
                {/* <Ai.AiOutlineMenu aria-controls="#basic-navbar-nav" size={20} />  */}
                <span className="btn menubox-btn fs-2 border-0" onClick={handleShow}><i class="bi bi-list"></i></span>
            {/* </Button>                */}
            <Navbar.Collapse id="basic-navbar-nav d-md-block">                
                <SearchBarTop />
                <Nav className="flex-sm-column flex-md-row">                     
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