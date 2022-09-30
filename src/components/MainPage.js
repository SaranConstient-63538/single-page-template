import React,{ useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import  './Mainpage.css'
const Sidebar = React.lazy(()=> import('./sidebar/Sidebar'));
const Topbar = React.lazy(()=> import('./topbar/Topbar'));
const Dashboard = React.lazy(()=> import('./pages/Dashboard'));
const LoginForm = React.lazy(()=> import('./LoginForm'));

const MainPage = () => {    
  const [show,setShow]=useState(false)
  // const [isBtn, setIsbtn]=useState(false)
  // const handleClose = () => setShow(false);
  const handleShow = () => {
    if(show){
      setShow(!show)
      console.log(show)
    }else{
      setShow(!show)
      console.log(show)
    }
  }
  
  return (
    <div className="wrapper d-flex align-items-stretch">      
      <Container fluid className="overflow-hidden p-0">     
          <Topbar handleShow={handleShow}/>   
          <Container fluid className="page-body-wrapper py-0 px-0">
            <Sidebar show={show}/>
            <div className='main-panel'>
              <div className='content-wrapper '>
                <Dashboard /> 
              </div>
            </div>            
          </Container>   
        </Container>
    </div>
    
  )
}

export default MainPage