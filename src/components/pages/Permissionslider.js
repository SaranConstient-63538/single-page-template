
import { Slider } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { Modal,Card, Button, Form, Col,Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import instance from '../../service/service';
import {useForm} from 'react-hook-form'

const Permissionslider =()=>{
  const { handleSubmit, register, formState:{errors}} = useForm();
    const format_date = "YYYY-MM-DD "
    const format_time = "h:mm"
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [startTime, setStartTime]=useState('')
    const [endTime, setEndTime]=useState('')
    let start_time = moment(startTime).format(format_time)
    let end_time = moment(endTime).format(format_time)
    const [show,setShow]=useState(false)
    const [per_show, setPer_show]=useState(false)
    const [per_reason,setPer_reason]=useState('')

    const [err_startDate,setErr_startDate]=useState(false)
    const [err_startTime,setErr_startTime]=useState(false)
    const [err_endTime,setErr_endTime]=useState(false)
    const [err_perReason,setErr_perReason]=useState(false);

    const onSubmit =(data)=>{
      console.log(data);
    }

  const [err_start,setErr_start]=useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const per_handleShow =()=>{
    setPer_show(true)
    console.log(per_show)
  }
  const per_handleClose =()=> setPer_show(false)
  const onSave =()=>{
    per_handleShow()
  }

    console.log(moment(startTime).startOf('hour'))
    // console.log(moment().endOf('hour').fromNow())
      const start = moment(startTime);
      const end = moment(endTime);
      console.log(endTime)
      console.log(startTime)
      
      let _permission ={
        from_date: moment(startDate).format(format_date).concat(''+ moment(startTime).format('hh:mm a') +''),  
        to_date: moment(startDate).format(format_date).concat(''+ moment(endTime).format('hh:mm a') +''),  
        start_time:parseFloat(start_time), 
        end_time:parseFloat(end_time),
        type_of_leave:'permission',
        description: per_reason,
      }
      const onCancel =()=>{
        console.log('cancel')
        setStartDate('')
        setStartTime('')
        setEndTime('')
        setPer_reason('')
      }
    const onPermission =()=>{
      console.log(startDate,startTime,endTime)
    
      console.log(_permission)
      const user = JSON.parse(localStorage.getItem('data'));
      
        if(user.role === "trainee" && user.token !== null){
          console.log('trainee')
          instance.post(process.env.REACT_APP_PERMISSION, _permission)
          .then(res =>{
            console.log(res.data, 'success')
            setStartDate('')
            setStartTime('')
            setEndTime('')
            setPer_reason('')
          }).catch( err =>{
            console.log(err.message)
          })
        }else{
          console.log("team leader")
          console.log(_permission)
          instance.post(process.env.REACT_APP_PERMISSION, _permission)
          .then(res =>{
            console.log(res.data, 'success')
            setStartDate('')
            setStartTime('')
            setEndTime('')
            setPer_reason('')
          }).catch( err =>{
            console.log(err.message)
          })
        }     
      
      
    } 
  

    const addDays = (date, period) =>{        
      return date.setDate(date.getDate() + period)        
  } 
    return(
      <>
        <Card className='text-center leave-card mb-2 mt-2 m-auto'>
          <Card.Body >
            <Card.Subtitle className="mb-3 mt-4 text-secondary">Permission</Card.Subtitle>                            
              <div className="  mt-2 mb-3 text-center ">
                <Button onClick={handleShow} >Apply</Button>
              </div>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
              <Modal.Title>Permission Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col xs="12" >      
                <Row>
                  <Col sm md className="mb-3">
                    <h6>Date:</h6>
                    <DatePicker
                      selected={startDate}
                      className='form-control'  
                      onChange={(date)=>setStartDate(date)}
                      minDate={new Date()}                      
                      dateFormat="yyyy-MM-dd"
                    />
                    {/* {!err_startDate && <p>Please select your Start Date</p>} */}
                  </Col>
                  <Col sm md  className="mb-3">
                  <h6>Start Time:</h6>
                  <DatePicker
                    className="form-control"
                    selected={startTime}
                    onChange={date => setStartTime(date)}
                    startTime={startTime}
                    endTime={endTime}                    
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}      
                    dateFormat="h:mm a"
                    timeCaption="Time"
                  />         
                  {/* {!err_startTime && <p>Please select your start time</p>}         */}
                </Col>
                
                <Col sm md className="mb-3">          
                  <h6>End Time: </h6>       
                    <DatePicker
                    className="form-control"
                    selected={endTime}
                    onChange={date => setEndTime(date)}
                    endTime={endTime}
                    startTime={startTime}                  
                    showTimeSelect
                    
                    showTimeSelectOnly
                    timeIntervals={60}
                    dateFormat="h:mm a"
                    timeCaption="Time"
                    />
                    {/* {!err_endTime && <p>Please select your end time</p>}     */}
                </Col>                  
              </Row>
              <h6 className='mb-3 mt-3'>Reason For </h6>
              <Form.Control 
                // {...register('per_reason',{required: false})}
                as="textarea" rows={3} className="mb-3" 
                value={per_reason} onChange={(event)=> setPer_reason(event.target.value)}/>
              {/* {!err_perReason && <p>please enter your reason </p>} */}
                {/* <input type="submit" value="Submit" className='rounded-4 btn btn-primary text-end' /> */}
                
              <Button className="mb-3 rounded-4 ms-1" onClick={onSave}>Submit</Button>
            </Col>            
          </Modal.Body>
        </Modal>  
        <Modal show={per_show} onHide={per_handleClose} size="md" centered>
          <Modal.Header closeButton className='text-primary fs-5'>
              Are you sure ?                
          </Modal.Header>
          <Modal.Body>      
            <p >To apply Permission on ({moment(startDate).format('YYYY-MM-DD')}) and  time ({moment(startTime).hour()} to {moment(endTime).hour()}) </p>                  
            <div className="text-center">
              <Button className="btn btn-light text-primary rounded-4 shadow-lg px-2 m-3" onClick={onCancel}>Cancel</Button>
              <Button onClick={onPermission} className="btn btn-primary shadow-lg rounded-4 px-2">Save</Button>
            </div>
          </Modal.Body>
        </Modal>    
      </>
    )
}
export default Permissionslider;

