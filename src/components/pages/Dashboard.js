import React, {useState,useEffect} from 'react';
import {Container, Row, Col,Card, Table,Button} from 'react-bootstrap';
import { CircularProgressbar} from 'react-circular-progressbar'
import Permissionslider    from './Permissionslider';
import axios from 'axios'

import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service'


const Dashboard = () => {
       const [sick_leave, setSick_leave]=useState('')
       const [casual_leave, setCasual_leave]=useState('')
       const [work_from_home, setWork_from_home]=useState('')
       const [userList, setUserList]=useState([])
    //    const [sick_leave, setSick_leave]=useState('')
    useEffect(()=>{
       
        instance.post('/leaveList').then(res =>{
            console.log( res.data);
           for( var i=0; i< res.data.result.length;i++){
            if(res.data.result[i].id === 1){
                setSick_leave(res.data.result[i])
            }else if(res.data.result[i].id === 2){
                setCasual_leave(res.data.result[i])
            }else if(res.data.result[i].id === 3){
                setWork_from_home(res.data.result[i])
            }
           }
        }).catch( err =>{
            console.log(err.message)
        })
        instance.get('/usersLeaveList').then(res => {
            console.log(res.data)
            setUserList(res.data)
        })
        
    },[])

    




  
  return (
    <>
        <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow">
            <Col className="px-3 mt-3 mb-3">
                <h4 className='text-start'>User Name</h4>                
            </Col>
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
        <Card>
            <Col className="px-3 mt-3 mb-3">
                <h4 className='text-start'>User Leave List</h4>                
            </Col>
            <Col className="px-3 py-3 mt-3 mb-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Type of Leave</th>
                            <th>Leave Reason</th>
                            <th>Approval Status</th>
                            {/* <th>Team Leader</th> */}
                        </tr>
                    </thead>
                    <tbody className="overflow-auto">
                        {
                            userList.map((item,idx)=>{
                                console.log(item)
                               return(
                                    <tr key={idx}>
                                        <td>{idx +  1}</td>

                                        <td>{item.type_of_leave === 'sick_leave'? 'Sick Leave': item.type_of_leave === 'casual_leave' ? 'Casual Leave':item.type_of_leave === 'work_from_home' ? 'Work From Home':''  }</td>                                      
                                        <td>{item.description}</td>
                                        <td>
                                            {item.status === 0 ?(
                                                <p className='fs-6' >Waiting for Approval</p>
                                            ):(
                                                <p>Approved</p>
                                            )
                                        } 
                                        </td>
                                        {/* <td>{}</td> */}
                                    </tr>
                               )
                            })
                        }
                    </tbody>
                    
                    
                </Table>
            </Col>
        </Card>
   
    
    </>
  )
}

export default Dashboard