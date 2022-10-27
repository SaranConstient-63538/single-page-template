import React, {useState,useEffect} from 'react';
import { Row, Col,Card, Button, Modal } from 'react-bootstrap';
import Permissionslider    from './Permissionslider';
import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service'
import LeaveListTab from './LeaveListTab'
import { motion } from 'framer-motion'
import { UserLeaveList } from '../tables/UserLeaveList';

const TlDashboard = () => {   
    // let user_list;
    const [sick_leave, setSick_leave]=useState('')
    const [casual_leave, setCasual_leave]=useState("")
    const [work_from_home, setWork_from_home]=useState('')
    const items = JSON.parse(localStorage.getItem('data'))
    const [btn_req_show, setBtn_req_show]=useState(false)

    const req_handleShow =()=>{
        setBtn_req_show(true)        
    }
    const req_handleClose =()=> setBtn_req_show(false)
    // console.log(btn_req)
    useEffect(()=>{       
            instance.post(process.env.REACT_APP_LEAVELIST,).then(res =>{
                console.log( res.data);
                for( var i=0; i< res.data.result.length;i++){
                    if(res.data.result[i].type_of_leave === "sick_leave"){
                        setSick_leave(res.data.result[i])
                    }else if(res.data.result[i].type_of_leave === "casual_leave"){
                        setCasual_leave(res.data.result[i]) 
                    }else if(res.data.result[i].type_of_leave === "work_from_home"){
                        setWork_from_home(res.data.result[i])
                    }
                }
            }).catch( err =>{
                console.log(err.message)
            }) 
           
          
    },[])
    
    
  return (
    <>  
        <Card className="shadow-lg rounded-4">
            <Row className='pt-5 align-items-center px-5'>
                <Col>
                    <p className='text-start text-capitalize fw-bold fs-4 m-0'>welcome  {items.username}</p>                
                </Col>
                <Col className="text-end">
                    <Button className="btn lr-btn border-0 rounded-pill text-capitalize fw-bold shadow" onClick={req_handleShow} >leave request</Button>
                </Col>
            </Row>            
            <LeaveListTab />
        </Card>    
        <Modal show={btn_req_show} onHide={req_handleClose} size="xl" centered>
            <Modal.Header closeButton>
            <p className='text-capitalize fw-bold m-0 fs-5'>leave request</p>          
            </Modal.Header>
            <Modal.Body> 
                <>
                    <div className="py-5">            
                        <Col >
                            <Row className="justify-content-around">   
                                <Col sm md>
                                    <Permissionslider  />                    
                                </Col>
                                <Col sm md>
                                    <SickLeave sick_leave = {sick_leave} />
                                </Col>
                                <Col sm md>
                                    <CasualLeavel  casual_leave={casual_leave}/>
                                </Col>
                                <Col sm md>
                                    <WorkFromHome work_from_home={work_from_home}/>                  
                                </Col>
                            </Row>                
                        </Col>                
                    </div>
                    <Card className="border-0">
                        <motion.div animate={{y:[100,0]}} transition={{duration:2}}>
                            <div className='="text-center'>
                                <Col className="px-3 mt-3 mb-3">
                                    <h4 className='text-start text-capitalize m-0 fw-bold'>My leaves</h4>                
                                </Col>
                                <UserLeaveList />                                
                            </div>
                        </motion.div>

                    </Card>
                </>  
            </Modal.Body>
        </Modal>   
    </>
  )
}

export default TlDashboard