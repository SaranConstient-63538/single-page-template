import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import DatePicker from "react-datepicker";
import React,{useState} from 'react'
import moment from 'moment'
import { useEffect } from 'react';
import instance from '../../service/service'


const CasualLeavel =({casual_leave})=>{
  
    const format_date = "YYYY-MM-DD"
    const [day_count, setDaycount] = useState(0)
    const [tot_day_count, setTot_day_count]=useState(12)

    const addDays = (date, period) => {
        return date.setDate(date.getDate() + period);
      };

    const [startDate, setStartDate] = useState(addDays(new Date(),4));
    const [endDate, setEndDate] = useState(addDays(new Date(),4));

    const [casual_reason,setCasualreason]=useState('')
    
    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit=()=>{    
        const casual_apply ={
            from_date: moment(startDate).format(format_date),
            to_date: moment(endDate).format(format_date),
            type_of_leave: casual_leave.type_of_leave,
            description: casual_reason,
        }
        
        if(startDate <= endDate){
            // console.log(casual_apply);
            instance.post('/applyLeave',casual_apply)
            .then( res => {
                console.log(res.data)
                setStartDate('')
                setEndDate('')
                setCasualreason('')
            }).catch( err =>{
                console.log(err.message)
            })
        }else{
            console.log('Please select valid date')
        }
        
        // if(startDate <= endDate){
        //     console.log( moment(startDate).format(format_date),moment(endDate).format(format_date),sick_reason);
        // }else{
        //     console.log('Please select valid date')
        // }
    }
    const onCasualReason = (e)=>{
        setCasualreason(e.target.value)
    }
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body>
                    <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${casual_leave.per_year * 100 }`/`${tot_day_count}`} text={`${casual_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
               
                        <p className='position-absolute '></p>
                        <Card.Subtitle className="mb-3 mt-4 text-secondary">Casual Leave</Card.Subtitle>
                       
                        <div className="  mt-2 mb-3 text-center ">
                        <Button onClick={handleShow}
                            disabled={ casual_leave.per_year > 0 && casual_leave.per_month > 0 ? false: true}
                        >Apply</Button>
                        </div>
                    
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Casual Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs> 
                        <Row>.
                            <h6 className="mb-3 mt-1">Date:</h6>
                            <Col md sm={6} className='mb-3'>  
                                <DatePicker className='form-control'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Col>
                            <Col md sm={6} className='mb-3'>
                                <DatePicker className='form-control'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-3" value={casual_reason} onChange={onCasualReason}/>  
                        <Button onClick={onSubmit}>Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>        
        </>      
       
    )
}
export default CasualLeavel;


