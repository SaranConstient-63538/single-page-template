
import React, { useState } from 'react'
import { Modal,Card, Button, Form, Col,Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import instance from '../../service/service';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import "./leave.css";
import { Co2Sharp } from '@mui/icons-material';

const Permissionslider =()=>{
  const format_date = "YYYY-MM-DD"
  const format_time = "hh:mm"

  const [startDate,setStartDate]=useState('')
  const [startTime, setStartTime]=useState('')
  const [endTime, setEndTime]=useState('')
  let start_time = moment(startTime).format(format_time)
  let end_time = moment(endTime).format(format_time)

  const [show,setShow]=useState(false)
  const [per_show, setPer_show]=useState(false)
  const [per_reason,setPer_reason]=useState('')

  const [inputErrors,setInputErrors] = useState({startDate:'',startTime:'',endTime:'',per_reason:''})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const per_handleShow =()=>{
    setPer_show(true)
  }
  const nowday = moment().toDate();
  console.log(nowday)
  const per_handleClose =()=> setPer_show(false)
  const onSave =()=>{
    let errorCount = 0
    if(startDate === ''){
      errorCount++
      setInputErrors((prevState)=>{
        return{...prevState,startDate:'* Date Is Required'}
      })
    }else{
      setInputErrors((prevState)=>{
        return{...prevState,startDate:''}
      })
    }
    if(startTime === ''){
      errorCount++
      setInputErrors((prevState)=>{
        return{...prevState,startTime:'* StartTime Is Required'}
      })
    }else{
      setInputErrors((prevState)=>{
        return{...prevState,startTime:''}
      })
    }
    if(endTime === ''){
      errorCount++
      setInputErrors((prevState)=>{
        return{...prevState,endTime:'* EndTime Is Required'}
      })
    }else{
      setInputErrors((prevState)=>{
        return{...prevState,endTime:''}
      })
    }
    if(per_reason === ''){
      errorCount++
      setInputErrors((prevState)=>{
        return{...prevState,per_reason:'* Reason Is Required'}
      })
    }else{
      setInputErrors((prevState)=>{
        return{...prevState,per_reason:''}
      })
    }
   
    if(errorCount === 0 && startTime <= endTime){
      const applyForm = {startDate,startTime,endTime,per_reason}
      console.log(applyForm)
      per_handleShow()
    }else{
      console.log('please select the valid time ')
    }
    
  }      
  console.log(startTime)
  const _permission ={
    from_date: moment(startDate,`YYYY-MM-DD ${moment(startTime,'hh:mm')}`),  
    to_date: moment(startDate,"YYYY-MM-DD hh:mm A"),  
    start_time:parseFloat(start_time), 
    end_time:parseFloat(end_time),
    type_of_leave:'permission',
    description: per_reason,
  }
  console.log(_permission)
  
  const onCancel =()=>{
    setStartDate('')
    setStartTime('')
    setEndTime('')
    setPer_reason('')
    per_handleClose();
  }
  const isWeekday = (date) => {
    const day = date.getDay(date);
    return day !== 0 && day !== 6;
  };

  const onPermission =()=>{
    console.log("hello world")
    const user = JSON.parse(localStorage.getItem('data'));      
    if(user.role === "trainee" && user.token !== null){
      instance.post(process.env.REACT_APP_PERMISSION, _permission)
      .then(res =>{
        console.log(res.data, 'success')        
        setStartDate('')
        setStartTime('')
        setEndTime('')
        setPer_reason('')
        per_handleClose()
        handleClose()
        toast.success('Successfully apply the Permission',{
          position: toast.POSITION.BOTTOM_LEFT,
        })
      }).catch( err =>{
        toast.error(`${err.message}`,{
          position: toast.POSITION.TOP_RIGHT,
        })
        console.log(err.message)
      })
    }else{
      instance.post(process.env.REACT_APP_PERMISSION, _permission)
      .then(res =>{
        console.log(res.data, 'success')      
        setStartDate('')
        setStartTime('')
        setEndTime('')
        setPer_reason('')
        per_handleClose()
        handleClose()
        toast.success('Successfully apply the Permission',{
          position: toast.POSITION.BOTTOM_LEFT,
        })
      }).catch( err =>{
        toast.error(`${err.message}`,{
          position: toast.POSITION.TOP_RIGHT,
        })
        console.log(err.message)
      })
    }    
  } 
  const addDays = (date, period) =>{        
    return date.setDate(date.getDate() + period)        
  } 
  return(
    <>
      <Card className='text-center leave-card m-auto shadow-lg'>
        <div className='my-auto'>
          <Card.Subtitle className="text-capitalize my-1 fw-bold">permission</Card.Subtitle>                            
            <Button onClick={handleShow} className="rounded-pill border-0 my-1 la-btn shadow">Apply</Button>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col xs="12" >      
            <Row>
              <Col sm md className="mb-2">
                <h6 className="text-primary fw-bold">Date:</h6>
                <DatePicker
                  selected={startDate}
                  className='form-control mb-2'  
                  onChange={(date)=>setStartDate(date)}
                  minDate={new Date()}                      
                  dateFormat="dd-MM-yyyy"
                  value={startDate}
                  filterDate={isWeekday}
                  onKeyDown={(e) => {
                    e.preventDefault();
                }}
                />
                {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
              </Col>
              <Col sm md  className="mb-2">
                <h6 className="text-primary fw-bold">From:</h6>
                <DatePicker
                  className="form-control mb-2"
                  selected={startTime}
                  onChange={date => setStartTime(date)}
                  startTime={startTime}
                  endTime={endTime}             
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}      
                  dateFormat="h:mm a"
                  timeCaption="Time"
                  value={startTime}
                  onKeyDown={(e) => {
                    e.preventDefault();
                }}
                />         
                  {inputErrors.startTime && <p className='text-danger'>{inputErrors.startTime}</p>}     
              </Col>
              <Col sm md className="mb-2">          
                <h6 className="text-primary fw-bold">To: </h6>       
                <DatePicker
                  className="form-control mb-2"
                  selected={endTime}
                  onChange={date => setEndTime(date)}
                  endTime={endTime}
                  startTime={startTime}                  
                  showTimeSelect                  
                  showTimeSelectOnly
                  timeIntervals={60}
                  dateFormat="h:mm a"
                  timeCaption="Time"
                  value={endTime}
                  onKeyDown={(e) => {
                    e.preventDefault();
                }}
                />
                {inputErrors.endTime && <p className='text-danger'>{inputErrors.endTime}</p>}
              </Col>                               
            </Row>
            <h6 className='mb-3 mt-3'>Reason</h6>
            <Form.Control 
              as="textarea" rows={3} className="mb-2" value={per_reason} 
              onChange={(event)=> setPer_reason(event.target.value)}
            />
            {inputErrors.per_reason && ( 
              <p className='text-danger'>
                {inputErrors.per_reason}
              </p>
            )} 
            <div className='text-end'>
            <Button className="rounded-pill" onClick={onSave}>
              Submit
            </Button>
            </div>
            
          </Col>            
        </Modal.Body>
      </Modal>  
      <Modal show={per_show} onHide={per_handleClose} size="md" centered>
        <Modal.Header closeButton className='text-primary fs-5'>
            Are you sure ?                
        </Modal.Header>
        <Modal.Body>      
          <p >To apply the Permission on date: {moment.utc(startDate).format('DD-MM-YYYY')} & time:  {moment(startTime).format('hh:mm a')} To {moment(endTime).format('hh:mm a')} </p>                  
          
          <Row>
          <Col className='text-start'>
                <Button onClick={onPermission} className="btn text-capitalize btn-success p-2 m-2 rounded-4 fs-6">apply</Button>
            </Col>
            <Col className='text-end'>
                <Button className="btn btn-danger p-2 m-2 rounded-4 fs-6 text-capitalize" onClick={onCancel}>Cancel</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal> 
    </>
  )
}
export default Permissionslider;

