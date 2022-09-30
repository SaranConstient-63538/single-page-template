import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React,{useState} from 'react'
import moment from 'moment'
import { useEffect } from 'react';


const CasualLeavel =({casual_leave})=>{
    const minDate = null;
    const maxDate = null
  
    const format_date = "YYYY-MM-DD"
    const [day_count, setDaycount] = useState(0)
    const [tot_day_count, setTot_day_count]=useState(12)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    const addDays = (date, period) => {
      return date.setDate(date.getDate() + period);
    };

    const [sick_reason,setSickreason]=useState('')
    
    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

   useEffect(()=>{
     minDate =moment(new Date()).add(4, 'day').format('YYYY-MM-DD');
     maxDate =moment(new Date()).add(30, 'day').format('YYYY-MM-DD');
    console.log(minDate);
    console.log(maxDate);
  
   },[])
    const onSubmit=()=>{           
        if(startDate <= endDate){
            console.log( moment(startDate).format(format_date),moment(endDate).format(format_date),sick_reason);
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
                <Card.Body>
                    <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${casual_leave.per_year * 100 }`/`${tot_day_count}`} text={`${casual_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
               
                        <p className='position-absolute '></p>
                        <Card.Subtitle className="mb-3 mt-4 text-secondary">Casual Leave</Card.Subtitle>
                       
                        <div className="  mt-2 mb-3 text-center ">
                        <Button onClick={handleShow}>Apply</Button>
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
                                <DatePicker
                                    selected={startDate}    
                                    onChange={(date) => setStartDate(date)}
                                    startDate={startDate}
                                    minDate={minDate}
                                    maxDate={maxDate}

                                    // minDate={addDays(new Date(),4)}
                                    // maxDate={addDays(new Date(),30)}
                                    dateFormat="dd-MM-yyyy"
                                />
                            </Col>
                            <Col md sm={6} className='mb-3'>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                minDate={minDate}
                                maxDate={maxDate}
                                // minDate={addDays(endDate, 4)}
                                // maxDate={addDays(new Date(), 30)}
                                dateFormat="dd-MM-yyyy"
                            />
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-3" value={sick_reason} onChange={onSickReason}/>  
                        <Button onClick={onSubmit}>Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>        
        </>      
       
    )
}
export default CasualLeavel;


