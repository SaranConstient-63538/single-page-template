import React, {useState,useEffect} from 'react';
import { Row, Col,Card, Table, Button, Modal } from 'react-bootstrap';
import Permissionslider    from './Permissionslider';
import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service'
import LeaveListTab from './LeaveListTab'
import moment from 'moment'

const TlDashboard = () => {   
    const [sick_leave, setSick_leave]=useState('')
    const [casual_leave, setCasual_leave]=useState("")
    const [work_from_home, setWork_from_home]=useState('')
    const [userList, setUserList]=useState([])
    const items = JSON.parse(localStorage.getItem('data'))
    const [btn_req_show, setBtn_req_show]=useState(false)

    const req_handleShow =()=>{
        setBtn_req_show(true)        
    }
    const req_handleClose =()=> setBtn_req_show(false)
    // console.log(btn_req)
    useEffect(()=>{  
        console.log(process.env)
        if(items.role === "team_leader"){         
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
        }else{
            instance.post(process.env.REACT_APP_LEAVELIST).then(res =>{
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
        }        
          
    },[])
    useEffect(()=>{
        console.log(userList)
        if(items.role === "team_leader"){
            instance.get(process.env.REACT_APP_USERS_LEAVELIST).then(res => {
                setUserList(res.data)
            })
        }
    },[])
    
    
  return (
    <>  
        <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow-lg rounded-4">
            <Row>
                <Col className="px-3 mt-3 mb-3">
                    <h4 className='text-start'>Welcome  {items.username}</h4>                
                </Col>
                <Col className="px-3 mt-3 mb-3 text-end">
                    <Button className="btn btn-primary" onClick={req_handleShow} >Leave Request</Button>
                </Col>
            </Row>            
            <LeaveListTab />
        </Card>
    
        <Modal show={btn_req_show} onHide={req_handleClose} size="xl" centered>
            <Modal.Header closeButton>
                Leave Request            
            </Modal.Header>
            <Modal.Body> 
                <>
                    <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow rounded-4">            
                        <Col >
                            <Row className="justify-content-around px-3 mb-3  ">   
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
                    </Card>
                    <Card className="">
                        <Col className="px-3 py-3 mt-3 mb-3">
                            <Table striped bordered hover responsive className='caption-top'>
                                <caption>                
                                    <h4 className='text-start'>My leaves</h4>
                                </caption>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Type of Leave</th>
                                        <th>Leave Reason</th>
                                        <th>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto">
                                    {
                                        userList.map((item,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{idx +  1}</td>
                                                    <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                    <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                    <td>{item.type_of_leave === 'sick_leave'? 'Sick Leave': item.type_of_leave === 'casual_leave' ? 'Casual Leave':item.type_of_leave === 'work_from_home' ? 'Work From Home':item.type_of_leave === 'permission' ? 'Permission': '' }</td>                                      
                                                    <td>{item.description}</td>
                                                    <td>
                                                        {item.status === 0 ?(
                                                            <p className='fs-6' >Waiting for Approval</p>
                                                        ):(
                                                            <p>Approved</p>
                                                        )
                                                    } 
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>   
                            </Table>
                        </Col>
                    </Card>
                </>  
            </Modal.Body>
        </Modal>   
    </>
  )
}

export default TlDashboard