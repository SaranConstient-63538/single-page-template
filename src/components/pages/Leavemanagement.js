import {Container, Row, Col, Stack, Form, Card, Button, Table} from 'react-bootstrap'
import { CircularProgressbar} from 'react-circular-progressbar'
import Permissionslider from './Permissionslider'
import DatePicker    from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react'
import {Box, Slider} from '@mui/material'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';


const Leavemanagement =()=>{
    const [startDate, setStartdate]=useState(new Date())
    const [endDate, setEnddate]=useState(new Date())
    const [workfromDate, setWorkfromDate]=useState(new Date())
    const [applySelect, setApplyselect]=useState('')
    const [leavetype, setLeavetype]=useState('')
    const [approval, setApproval]=useState(true)

    console.log(applySelect);
    
    let addDays = (date, period) =>{
        // console.log(date)
        return date.setDate(date.getDate() + period)        
    }
    let sickleave = 6;
    let casualleave =12;
    return (
    
        <Col md={12} lg={12} sm={12}>
            <Stack className="mt-3 mx-2 text-primary" gap={2}>
                <h5 className="mt-3 mb-3">Leave Management</h5>    
                <Card className='shadow'>
                    <Card.Body>
                        <Row>                            
                            <h6 className="mt-2 mb-2 mx-1">Apply For Leave</h6>
                            <Col md={6} sm={12} className="mt-2 mb-2 ">   
                                <Form.Control as="select" aria-label="Leave Types"  onChange={(event)=> setApplyselect(event.target.value)}>
                                    <option>Select the leave</option>
                                    <option value="leave">Leave</option>
                                    <option value="permission">Permission</option>
                                    <option value="workhome">Work From Home</option>
                                </Form.Control>                                                                       
                            </Col>
                            <Col md={6} sm={12} className="mt-2 mb-2 ">  
                                {applySelect === "leave" ? 
                                (<Form.Control as="select"  aria-label="Leave Types"  onChange={(event)=> setLeavetype(event.target.value)}>
                                    <option>Select the leave type</option>
                                    <option value="casual">Casual Leave</option>
                                    <option value="sick">Sick Leave</option>
                                </Form.Control>) : ''}                              
                            </Col>
                            {applySelect === "leave" ? 
                                leavetype === 'casual'? <CasualLeavel />
                                    : leavetype === 'sick'?
                                    (
                                        <>
                                            <Col md={6} sm={12}>                                                                                      
                                                <Row>.
                                                    <h6 className="mb-3 mt-0 mx-1">Date:</h6>
                                                    <Col md sm={6} className='mt-2'>                                                                
                                                        <DatePicker className=' form-control '
                                                            selected={startDate}
                                                            onChange={(date)=> setStartdate(date)}
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            placeholderText="From Date"
                                                            minDate={addDays(new Date(),-15)}  
                                                            maxDate={new Date()}
                                                            // isClearable
                                                        /> 
                                                    </Col>  
                                                    <Col md sm={6} className='mt-2'>
                                                        <DatePicker className='form-control '
                                                            selected={endDate}
                                                            onChange={(date)=>setEnddate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={addDays(new Date(),-15)}  
                                                            maxDate={new Date()}
                                                            placeholderText="To Date"   
                                                            // isClearable                                             
                                                        /> 
                                                    </Col>                           
                                                </Row>                                                                        
                                            </Col>
                                            <Col md={6} className='text-center mt-3' >
                                                <h6 className='mt-3'>Sick Leave </h6>
                                                <div style={{ width: 90, height: 90, margin :'auto', marginTop:'10px',fontSize:'30px',textAlign:'center' }}>
                                                    <CircularProgressbar value={100} text={sickleave} />
                                                </div>
                                            </Col>
                                        </>

                                ):''
                            :''
                            }
                            
                            <Col md={11} className="text-center mx-3 mt-2 mb-2" >
                                { applySelect === "permission" ? <Permissionslider />: ''}
                            </Col>
                            <>
                                {applySelect === "workhome" ? <WorkFromHome />:'' }
                            </>                                                                  
                        </Row> 
                        <Row >
                            <h6 className="mt-2 mb-2 mx-1">Reason for </h6>
                            <Col md={10}>                                
                                <Form.Control as="textarea" />                           
                            </Col>                            
                        </Row>
                        <Row >
                            <Col md={12} className="text-start mx-1 mt-2">                                
                                <Button >Submit</Button>                              
                            </Col>                            
                        </Row>  
                    </Card.Body>
                </Card>  
                <Card className="shadow">
                    <Card.Body>
                        <Col md={12} sm={12} className="mt-5">                                
                            <Table striped bordered hover>
                                <thead className='text-center'>
                                    <tr>
                                        <th>#</th>
                                        <th>Reason</th>    
                                        <th>Supervisor Name</th>                                            
                                        <th>Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Reason 1</td>   
                                        <td>In Charge name</td>                                              
                                        <td className="text-center">
                                            {approval ? <Form.Text className="text-success fs-5">Approved</Form.Text> : <Form.Text className="text-danger">Non-Approved</Form.Text>}
                                        </td>  
                                                                            
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Reason 2</td>
                                        <td>In Charge name</td> 
                                        <td  className="text-center">
                                            {approval ? <Form.Text className="text-success fs-5">Approved</Form.Text> : <Form.Text className="text-danger">Non-Approved</Form.Text>}
                                        </td>                                 
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Reason 2</td>
                                        <td>In Charge name</td> 
                                        <td className="text-center">
                                            {approval ? <Form.Text className="text-success fs-5">Approved</Form.Text> : <Form.Text className="text-danger">Non-Approved</Form.Text>}
                                        </td>                                    
                                    </tr>
                                </tbody>
                            </Table>                      
                        </Col>
                    </Card.Body>
                </Card>
            </Stack>
        </Col>
         
    )
}
export default Leavemanagement;