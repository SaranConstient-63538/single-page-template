import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import {lazy} from 'react'

import React,{useState} from 'react'
import './leave.css'

import moment from 'moment';
import instance from '../../service/service';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
// const Dropzone = lazy(()=> import('react-dropzone'))


const SickLeave =({sick_leave})=>{
    const format_date = "YYYY-MM-DD"
    
    const [file_upload, setFile_upload] = useState([]);
  
    
    const [startDate, setStartdate]=useState('')
    const [endDate, setEnddate]=useState('')
    const [sick_reason,setSickreason]=useState('')
   
    const [show,setShow]=useState(false)
    const [sick_show,setSick_show]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputErrors,setInputErrors] = useState({startDate:'',endDate:'',sick_reason:'',file_upload:''})

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
        const applyForm = {startDate,endDate,sick_reason,file_upload}
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
        file: file_upload,
    }
  
    const onCancel =()=>{
        console.log('cancel')
        setStartdate('')
        setEnddate('')
        sick_handleClose();
        setSickreason('')
        sick_handleClose();
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
    const handleDrop = event =>{
        setFile_upload(event.target.files[0]);
        console.log(event.target.files[0])
    }
    
    return (
        <>
            <Card className='text-center leave-card m-auto shadow'>
        <div className='my-auto'>
          <Card.Subtitle className="text-capitalize my-1 fw-bold">sick leave</Card.Subtitle>                            
            <Button onClick={handleShow} className="rounded-pill border-0 my-1 la-btn shadow">Apply</Button>
        </div>
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
                        <h6 className='mb-3 mt-3'>Doc Upload </h6>
                        <Form.Control className="mb-2" type="file" onChange={handleDrop} multiple />    
                        {/* <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>Drag'n'drop files, or click to select files</p>
                            </div>
                            )}
                        </Dropzone> */}
                        {inputErrors.sick_reason && <p className='text-danger'>{inputErrors.file_upload}</p>} 
                            
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
                            <Button onClick={onSubmit} className="btn btn-success p-2 m-2 rounded-4 fs-6">Save</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>    
        </>
    )
}
export default SickLeave;


