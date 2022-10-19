import React,{ useState, lazy} from 'react';
import  './Mainpage.css'
//library
const { Container } = lazy(()=>import('react-bootstrap'))
//components
const Sidebar = lazy(()=> import('./sidebar/Sidebar'));
const Topbar = lazy(()=> import('./topbar/Topbar'));
const Dashboard = lazy(()=> import('./pages/Dashboard'));

const MainPage = () => {    
  //initialize the state or variables
  const [show,setShow]=useState(false)

  //onClick function using sidebar show and hide
  const handleShow = () => {
    if(show){
      setShow(!show)
    }else{
      setShow(!show)
    }
  }  
  return (
    <div className="wrapper d-flex align-items-stretch">      
      <Container fluid className="overflow-hidden p-0 bg-grad">     
        <Topbar handleShow={handleShow}/>   
        <Container fluid className="page-body-wrapper py-0 px-0">
          <Sidebar show={show}/>
          <div className='main-panel'>
            <div className='content-wrapper'>
              <Dashboard /> 
            </div>
          </div>            
        </Container>   
      </Container>
    </div>    
  )
}
export default MainPage