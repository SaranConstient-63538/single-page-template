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
        <Card className="mt-4 mb-4 px-2 mx-3 ">
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
    </>
  )
}

export default Dashboard