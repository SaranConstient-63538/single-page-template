import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import DatePicker from "react-datepicker";

import React,{useState} from 'react'
import './leave.css'
import moment from 'moment';
import instance from '../../service/service';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'


const SickLeave =({sick_leave})=>{
    const format_date = "DD-MM-YYYY"

    const [startDate, setStartdate]=useState('')
    const [endDate, setEnddate]=useState('')
    const [sick_reason,setSickreason]=useState('')
   
    const [show,setShow]=useState(false)
    const [sick_show,setSick_show]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputErrors,setInputErrors] = useState({startDate:'',endDate:'',sick_reason:''})

    const sick_handleShow =()=> {
        let errorCount=0
        if(startDate ===''){
            errorCount++
            setInputErrors((prevState)=>{
                return{...prevState,startDate:'* Start date Is Required'}
            })
        }else{
            setInputErrors((prevState)=>{
                return{...prevState,startDate:''}
            })
        }
        if(endDate === ''){
            errorCount++
            setInputErrors((prevState)=>{
                return{...prevState,endDate:'* End date Is Required'}
            })
        }else{
            setInputErrors((prevState)=>{
                return{...prevState,endDate:''}
            })
        }
        if(sick_reason==''){
            errorCount++
            setInputErrors((prevState)=>{
                return{...prevState,sick_reason:'* Reason Is Required'}
            })
        }else{
            setInputErrors((prevState)=>{
                return{...prevState,sick_reason:''}
            })
        }

        if(sick_reason ===''){
            errorCount++
            setInputErrors((prevState)=>{
                return{...prevState,per_reason:'* Reason Is Required'}
            })
        }else{
            setInputErrors((prevState)=>{
                return{...prevState,per_reason:''}
            })
        }
        if(errorCount==0){
        const applyForm = {startDate,endDate,sick_reason}
        console.log(applyForm)
        setSick_show(true);
        }
    }
    const sick_handleClose =()=> setSick_show(false)

    const addDays = (date, period) =>{        
        return date.setDate(date.getDate() + period)        
    }     
    const sick_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: sick_leave.type_of_leave,
        description: sick_reason,
    }  
    const onCancel =()=>{
        console.log('cancel')
        setStartdate('')
        setEnddate('')
        sick_handleClose();
        setSickreason('')
    }
    const onSubmit=(data)=>{
        const item = JSON.parse(localStorage.getItem('data'));    
        if(item.role === "trainee" && item.token !== null){
            console.log('trainee')
            if(startDate < endDate ){
                console.log(sick_apply)
                instance.post(process.env.REACT_APP_APPLY_LEAVE,sick_apply)
                .then( res => {
                    console.log(res.data)
                    setStartdate('')
                    setEnddate('')
                    setSickreason('')
                    sick_handleClose();
                    handleClose()
                    toast.success('Successfully apply the Sick Leave',{
                        position: toast.POSITION.BOTTOM_LEFT,
                    })
                }).catch( err =>{
                    toast.error(`${err.message}`,{
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    console.log(err.message)
                })
            }else{
                toast.error('Please select valid date',{
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
        }else{
            if(startDate < endDate){
                console.log(sick_apply)
                instance.post(process.env.REACT_APP_APPLY_LEAVE,sick_apply)
                .then( res => {
                    console.log(res.data)
                    setStartdate('')
                    setEnddate('')
                    setSickreason('')
                    sick_handleClose();
                    handleClose()
                    toast.success('Successfully apply the Sick Leave',{
                        position: toast.POSITION.BOTTOM_LEFT,
                    })
                }).catch( err =>{
                    toast.error(`${err.message}`,{
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    console.log(err.message)
                })
            }else{
                toast.error('Please select valid date',{
                    position: toast.POSITION.TOP_RIGHT,
                })
                console.log('Please select valid date')
            }
        }      
    }
    const isWeekday = (date) => {
        const day = date.getDay(date);
        return day !== 0 && day !== 6;
    };
    const onSickReason = (e)=>{
        setSickreason(e.target.value)
    }  
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body >
                    <Card.Subtitle className="mb-3 mt-4 text-secondary">Sick Leave</Card.Subtitle>
                    <motion.button className="border-0 mt-2 mb-3 text-center "  whileHover={{ scale: 1.1 }}>
                        <Button onClick={handleShow} className="rounded-4">Apply</Button>
                    </motion.button> 
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sick Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs> 
                        <Row>                            
                            <Col md sm={6} className='mb-3'>  
                                <h6 className="mb-3 mt-1">Start Date:</h6>
                                <DatePicker     className='form-control mb-2'                               
                                   selected={startDate}
                                   onChange={(date) => setStartdate(date)}
                                   selectsStart
                                   maxDate={addDays(new Date(), 15)}
                                   dateFormat="dd-MM-yyyy"
                                   filterDate={isWeekday}
                                /> 
                                {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
                            </Col>
                            
                            <Col md sm={6} className='mb-3'>
                            <h6 className="mb-3 mt-1">End Date:</h6>
                                <DatePicker className='form-control mb-2'
                                     selected={endDate}
                                     onChange={(date) => setEnddate(date)}
                                     selectsEnd
                                     maxDate={addDays(new Date(), 15)}
                                     dateFormat="dd-MM-yyyy"  
                                     filterDate={isWeekday}                                     
                                />
                                  {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}       
                            </Col>
                        </Row>   
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" 
                            value={sick_reason} onChange={onSickReason} 
                        />    
                        {inputErrors.sick_reason && <p className='text-danger'>{inputErrors.sick_reason}</p>}                   
                        <Button onClick={sick_handleShow} className="m-1 p-2 rounded-4">Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>    
            <Modal show={sick_show} onHide={sick_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                    <p>To apply the Sick leave From :  {sick_apply.from_date} To : {sick_apply.to_date} </p>                  
                    <Row>
                        <Col className='text-start'>
                            <Button className="btn btn-danger p-2 m-2 rounded-4 fs-6" onClick={onCancel}>Cancel</Button>
                        </Col>
                        <Col className='text-end'>
                            <Button onSubmit={onSubmit} className="btn btn-success p-2 m-2 rounded-4 fs-6">Save</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>    
        </>
    )
}
export default SickLeave;


