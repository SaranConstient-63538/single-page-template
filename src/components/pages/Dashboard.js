import React, {useState,useEffect} from 'react';
import { Row, Col,Card, Table } from 'react-bootstrap';
import Permissionslider    from './Permissionslider';
import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service'
import EmpDashboard from './EmpDashboard';
import TlDashboard from './TlDashboard';

const Dashboard = () => {
   const items = JSON.parse(localStorage.getItem('data'))
  return (
    <>
        <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow rounded-4">
           <Col >
                <Row className="justify-content-around px-3 mb-3  ">    
                { items.role === "trainee" ?
                    (
                        <EmpDashboard  />
                    ):(
                        <TlDashboard  />
                    )

                }          
                    
                </Row>                
           </Col>
        
        </Card>
        {/* <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow-lg rounded-4">
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
                        </tr>
                    </thead>
                    <tbody className="overflow-auto">
                        {
                            userList.map((item,idx)=>{
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
                                      
                                    </tr>
                               )
                            })
                        }
                    </tbody>   
                </Table>
            </Col>
        </Card>    */}
    
    </>
  )
}

export default Dashboard