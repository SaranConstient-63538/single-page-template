import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import DatePicker from "react-datepicker";

import React,{useState} from 'react'
import './leave.css'
import moment from 'moment';
import instance from '../../service/service';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {motion } from 'framer-motion'

let schema =yup.object().shape({
    startDate: yup.date().required('Please select your start date'),
    endDate: yup.date().required('Please select your end date'),
    sick_reason : yup.string().required('Please enter your reason'),
})

const SickLeave =({sick_leave})=>{
    const {control,handleSubmit,formState:{errors}}=useForm({
        resolver: yupResolver(schema)
    })
    console.log(sick_leave)
    const format_date = "YYYY-MM-DD"
    const [tot_day_count]=useState(12)

    const [startDate, setStartdate]=useState('')
    const [endDate, setEnddate]=useState('')
    const [sick_reason,setSickreason]=useState('')
    const [err_startDate,setErr_startDate]=useState(false)
    const [err_endDate,setErr_endDate]=useState(false)
    const [err_reason,setErr_Reason]=useState(false)
    const [show,setShow]=useState(false)
    const [sick_show,setSick_show]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputErrors,setInputErrors] = useState({startDate:'',endDate:'',sick_reason:''})

    const sick_handleShow =()=> {
        console.log(sick_show)

        let errorCount=0
    if(startDate==''){
      errorCount++
      setInputErrors((prevState)=>{
        return{...prevState,startDate:'* Start date Is Required'}
      })
    }else{
      setInputErrors((prevState)=>{
        return{...prevState,startDate:''}
      })
    }

    if(endDate==''){
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

    if(sick_reason==''){
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
    //   per_handleShow()
    }

    }
    const sick_handleClose =()=> setSick_show(false)

    const addDays = (date, period) =>{        
        return date.setDate(date.getDate() + period)        
    }   
    console.log(Math.ceil(endDate-startDate/(1000*3600*24)))
    const item = JSON.parse(localStorage.getItem('data'))
    console.log(item)
  
    const sick_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: sick_leave.type_of_leave,
        description: sick_reason,
    }  
    const start = moment(startDate);
    const end = moment(endDate)
    console.log(end.day() - start.day())

    const onCancel =()=>{
        console.log('cancel')
        setStartdate('')
        setEnddate('')
        setSickreason('')
    }
    const onSubmit=(data)=>{
        console.log(data)
        /* if(item.role === "trainee" && item.token !== null){
            console.log('trainee')
            if(startDate < endDate ){
                console.log(sick_apply)
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
        }else{
            console.log('team_leader')
            if(startDate < endDate){
                console.log(sick_apply)
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
        }       */ 
    }
    const onSickReason = (e)=>{
        setSickreason(e.target.value)
    }  
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body >
                    {/* <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${ typeof  sick_leave.per_year !== 'undefined' || sick_leave.per_year > 0 ? sick_leave.per_year * 100 : 0}`/`${tot_day_count}`} text={`${sick_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div> */}
                    <Card.Subtitle className="mb-3 mt-4 text-secondary">Sick Leave</Card.Subtitle>
                    <motion.button className="border-0 mt-2 mb-3 text-center "  whileHover={{ scale: 1.1 }}>
                        <Button onClick={handleShow} className="rounded-4 "
                            // disabled={ sick_leave.per_year > 0 && sick_leave.per_month > 0 ? false : true}
                        >Apply</Button>
                    </motion.button>    
                          
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sick Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs> 
                        <Row>.
                            
                            <Col md sm={6} className='mb-3'>  
                            <h6 className="mb-3 mt-1">Start Date:</h6>
                                <DatePicker     className='form-control mb-2'                               
                                   selected={startDate}
                                   onChange={(date) => setStartdate(date)}
                                   selectsStart
                                   maxDate={addDays(new Date(), 0)}
                                   dateFormat="dd-MM-yyyy"
                                /> 
                                {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
                            </Col>
                            
                            <Col md sm={6} className='mb-3'>
                            <h6 className="mb-3 mt-1">End Date:</h6>
                                <DatePicker className='form-control mb-2'
                                     selected={endDate}
                                     onChange={(date) => setEnddate(date)}
                                     selectsEnd
                                     maxDate={addDays(new Date(), 0)}
                                     dateFormat="dd-MM-yyyy"                                       
                                />
                                  {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}       
                            </Col>
                        </Row>   
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" 
                            value={sick_reason} onChange={onSickReason} 
                        />    
                        {inputErrors.sick_reason && <p className='text-danger'>{inputErrors.sick_reason}</p>}                   
                        <Button onClick={sick_handleShow}>Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>    
            <Modal show={sick_show} onHide={sick_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                    <p>To apply {end.day() - start.day()}  day of Casual leave From ({sick_apply.from_date}) To ({sick_apply.to_date}) </p>                  
                    <Button className="btn btn-danger px-2 m-2" onClick={onCancel}>Cancel</Button>
                    {/* <Button onSubmit={onSubmit} className="btn btn-success px-2">Save</Button> */}
                </Modal.Body>
            </Modal>    
        </>
    )
}
export default SickLeave;


