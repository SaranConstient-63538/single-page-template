import React, {useState} from 'react';
import {Container, Row, Col,Card, Button} from 'react-bootstrap';
import { CircularProgressbar} from 'react-circular-progressbar'
import Permissionslider    from './Permissionslider';

import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';

const Leavemanagement = () => {
    // const [date,setDate]=useState(new Date());
    
    let addDays = (date, period) =>{
        return date.setDate(date.getDate() + period)        
    }

    let sickleave = 6;
    let permission = 0;
    let casualleave = 12;
    let workfromhome = 20;
  
  return (
    <>
        <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow">
            <Col className="px-3 mt-3 mb-3">
                <h4 className='text-start'>User Name</h4>                
            </Col>
           <Col >
                <Row className="justify-content-around px-3 mb-3  ">
                    <Col sm md>
                        <Permissionslider />                    
                    </Col>
                    <Col sm md>
                        <SickLeave />
                    </Col>
                    <Col sm md>
                        <CasualLeavel />
                    </Col>
                    <Col sm md>
                        <WorkFromHome />                  
                    </Col>
                </Row>                
           </Col>
        
        </Card>
   
    
    </>
  )
}

export default Leavemanagement