
import React, { useState } from 'react'
import { Modal,Card, Button, Form, Col,Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import instance from '../../service/service';
import { toast } from 'react-toastify'
import "./leave.css";

const Permissionslider =()=>{
  const format_date = "YYYY-MM-DD"
  // const format_time = "hh:mm"

  const [startDate,setStartDate]=useState('')
  const [startTime, setStartTime]=useState(new Date().setHours(new Date().setMinutes(30),9))
  const [endTime, setEndTime]=useState('')
  const dt =new Date();
  const [show,setShow]=useState(false)
  const [per_show, setPer_show]=useState(false)
  const [per_reason,setPer_reason]=useState('')
  const start_time= moment(startTime).format('hh:mm')
  const end_time = moment(endTime).format('hh:mm')

  const [inputErrors,setInputErrors] = useState({startDate:'',startTime:'',endTime:'',per_reason:''})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const per_handleShow =()=>{
    setPer_show(true)
  }
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
      // const applyForm = {startDate,startTime,endTime,per_reason}
      // console.log(applyForm)
      per_handleShow()
    }else{
      toast.error('please select the valid time',{
          position: toast.POSITION.TOP_RIGHT,
      })
    }
    
  }      
  const _permission ={
    from_date: moment(startDate).format(format_date).concat(' '+ moment(startTime).format('hh:mm a')+' '),  
    to_date: moment(startDate).format(format_date).concat(' '+ moment(endTime).format("hh:mm a")+' '),  
    start_time:parseFloat(start_time), 
    end_time:parseFloat(end_time),
    type_of_leave:'permission',
    description: per_reason,
  }
  
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
    const user = JSON.parse(localStorage.getItem('data')); 
         
    if(user.role === "trainee" && user.token !== null){
      instance.post(process.env.REACT_APP_PERMISSION, _permission)
      .then(res =>{
        // console.log(res)        
        setStartDate('')
        setStartTime('')
        setEndTime('')
        setPer_reason('')
        per_handleClose()
        handleClose()
        toast.success('Successfully apply the Permission',{
          position: toast.POSITION.TOP_RIGHT,
        })
      }).catch( err =>{
        toast.error(`${err.message}`,{
          position: toast.POSITION.TOP_RIGHT,
        })
        // console.log(err.message)
      })
    }else{
      instance.post(process.env.REACT_APP_PERMISSION, _permission)
      .then(res =>{
        // console.log(res)      
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
        // console.log(err.message)
      })
    }    
  } 
  // const addDays = (date, period) =>{        
  //   return date.setDate(date.getDate() + period)        
  // } 
  
    // const filterPassedTime = (time) => {
    //   const currentDate = new Date();
    //   const selectedDate = new Date(time);
  
    //   return currentDate.getTime() < selectedDate.getTime();
    // };
  
  return(
    <>
      <Card className='text-center leave-card m-auto shadow-lg'>
        <div className='my-auto'>
          <Card.Subtitle className="text-capitalize my-1 fw-bold">permission</Card.Subtitle>                            
            <Button onClick={handleShow} className="rounded-pill border-0 my-1 la-btn shadow">Apply</Button>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
            <Modal.Title className='text-secondary'>Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col xs >      
            <Row>
              <Col sm md className="mb-2">
                <h6 className="fw-bold">Date:</h6>
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
                <h6 className="fw-bold">From:</h6>
                <DatePicker
                  className="form-control mb-2"
                  selected={startTime}
                  onChange={date => setStartTime(date)}
                  // filterTime={filterPassedTime}         
                  showTimeSelect
                  showTimeSelectOnly
                  minTime={dt.setHours(9,30,0)}
                  maxTime={dt.setHours(18,30,0)}
                  timeIntervals={30}      
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
                <h6 className="fw-bold">To: </h6>       
                <DatePicker
                  className="form-control mb-2"
                  selected={endTime}
                  onChange={date => setEndTime(date)}                                
                  showTimeSelect                  
                  showTimeSelectOnly
                  minTime={dt.setHours(9,30,0)}
                  maxTime={dt.setHours(18,30,0)}
                  // filterTime={filterPassedTime}   
                  timeIntervals={30}      
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
            <h6 className='mb-3 mt-3 fw-bold'>Reason</h6>
            <Form.Control 
              as="textarea" rows={3} className="mb-2" value={per_reason} 
              onChange={(event)=> setPer_reason(event.target.value)} style={{resize:'none'}}
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
          <p >To apply the Permission on date: {moment(startDate).format('DD-MM-YYYY')} & time:  {moment(startTime).format('hh:mm a')} To {moment(endTime).format('hh:mm a')} </p>                  
          
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

