import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import DatePicker from "react-datepicker";

import React,{useState} from 'react'
import './leave.css'
import moment from 'moment';
import instance from '../../service/service';


const SickLeave =({sick_leave})=>{
    console.log(sick_leave)
    const format_date = "YYYY-MM-DD"
    const [tot_day_count]=useState(12)

    const [startDate, setStartdate]=useState(new Date())
    const [endDate, setEnddate]=useState(new Date())
    const [sick_reason,setSickreason]=useState('')
    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addDays = (date, period) =>{        
        return date.setDate(date.getDate() + period)        
    }   
    const onSubmit=()=>{
        const sick_apply ={
            from_date: moment(startDate).format(format_date),
            to_date: moment(endDate).format(format_date),
            type_of_leave: sick_leave.type_of_leave,
            description: sick_reason,
        }        
        if(startDate <= endDate){
            instance.post(process.env.REACT_APP_APPLY_LEAVE,sick_apply)
            .then( res => {
                console.log(res.data)
                setStartdate('')
                setEnddate('')
                setSickreason('')
            }).catch( err =>{
                console.log(err.message)
            })
        }else{
            console.log('Please select valid date')
        }
    }
    const onSickReason = (e)=>{
        setSickreason(e.target.value)
    }  
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body >
                    <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${sick_leave.per_year > 0 ? sick_leave.per_year * 100 : 0}`/`${tot_day_count}`} text={`${sick_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
                    <Card.Subtitle className="mb-3 mt-4 text-secondary">Sick Leave</Card.Subtitle>
        
                    <div className="  mt-2 mb-2 text-center ">
                    <Button onClick={handleShow} 
                        disabled={ sick_leave.per_year > 0 && sick_leave.per_month > 0 ? false: true}>Apply</Button>
                    </div>                   
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sick Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs> 
                        <Row>.
                            <h6 className="mb-3 mt-1">Date:</h6>
                            <Col md sm={6} className='mb-3'>  
                                <DatePicker     className='form-control'                               
                                   selected={startDate}
                                   onChange={(date) => setStartdate(date)}
                                   selectsStart
                                   maxDate={addDays(new Date(), 0)}
                                   dateFormat="dd-MM-yyyy"
                                /> 
                            </Col>
                            <Col md sm={6} className='mb-3'>
                                <DatePicker className='form-control'
                                     selected={endDate}
                                     onChange={(date) => setEnddate(date)}
                                     selectsEnd
                                     maxDate={addDays(new Date(), 0)}
                                     dateFormat="dd-MM-yyyy"                                       
                                />  
                            </Col>
                        </Row>   
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-3" 
                            value={sick_reason} onChange={onSickReason} 
                        />                       
                        <Button onClick={onSubmit}>Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>        
        </>
    )
}
export default SickLeave;


