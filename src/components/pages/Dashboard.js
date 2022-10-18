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
      <Col >
          <Row className="justify-content-around pt-5 mt-5 px-5">    
            { items.role === "trainee" ?
                (
                    <EmpDashboard  />
                ):(
                    <TlDashboard  />
                )
            }    
          </Row>                
      </Col>
    </>
  )
}

export default Dashboard