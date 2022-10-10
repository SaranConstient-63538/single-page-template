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

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [casual_reason,setCasualreason]=useState('')
    const [show,setShow]=useState(false)
    const [casual_show, setCasual_show]=useState(false)

    const [inputErrors,setInputErrors] = useState({startDate:'',endDate:'',casual_reason:''})

    const casual_handleShow =()=> {
        console.log(casual_show);
        console.log(startDate,endDate,casual_reason)

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
    
        if(casual_reason==''){
          errorCount++
          setInputErrors((prevState)=>{
            return{...prevState,casual_reason:'* Reason Is Required'}
          })
        }else{
          setInputErrors((prevState)=>{
            return{...prevState,casual_reason:''}
          })
        }
        if(errorCount==0){
          const applyForm = {startDate,endDate,casual_reason}
          console.log(applyForm)
          setCasual_show(true);
        //   per_handleShow()
        }
    }
    const casual_handleClose =()=> setCasual_show(false)
    const start = moment(startDate);
    const end = moment(endDate)
    console.log(end.day() - start.day())
    const casual_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: casual_leave.type_of_leave,
        description: casual_reason,
    }
    console.log(endDate - startDate)
    const onCancel =()=>{
        console.log('cancel')
        setStartDate('')
        setEndDate('')
        setCasualreason('')
    }
    const item = JSON.parse(localStorage.getItem('data'))
    console.log(item)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(typeof  casual_leave.per_year === 'undefined')

    const onSubmit=()=>{   
       
        if(item.role === "trainee" && item.token !== null){
            if(startDate < endDate){
                // console.log(casual_apply);
                instance.post(process.env.REACT_APP_APPLY_LEAVE,casual_apply)
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

        }else{
            if(startDate < endDate){
                // console.log(casual_apply);
                instance.post(process.env.REACT_APP_APPLY_LEAVE,casual_apply)
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
        }
    }
    const onCasualReason = (e)=>{
        setCasualreason(e.target.value)
    }
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body>
                    {/* <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${typeof  casual_leave.per_year === 'undefined' ? 0: casual_leave.per_year * 100 }`/`${tot_day_count}`} text={`${casual_leave.per_year === undefined ? 0: casual_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div> */}
               
                        <p className='position-absolute '></p>
                        <Card.Subtitle className="mb-3 mt-4 text-secondary">Casual Leave</Card.Subtitle>
                       
                        <div className="  mt-2 mb-3 text-center ">
                        <Button onClick={handleShow}
                            // disabled={ casual_leave.per_year > 0 && casual_leave.per_month > 0 || casual_leave.per_year === undefined ? false: true}
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
                            <Col md sm={6} className='mb-3'>  
                            <h6 className="mb-3 mt-1">Start Date:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                                 {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
                            </Col>
                            <Col md sm={6} className='mb-3'>
                            <h6 className="mb-3 mt-1">End Date:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                                 {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" value={casual_reason} onChange={onCasualReason}/> 
                        {inputErrors.casual_reason && <p className='text-danger'>{inputErrors.casual_reason}</p>} 
                        <Button onClick={casual_handleShow}>Submit</Button>                                                                 
                    </Col>              
                </Modal.Body>
            </Modal>   
            <Modal show={casual_show} onHide={casual_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                    <p>To apply {end.day() - start.day()}  day of Sick leave From ({casual_apply.from_date}) To ({casual_apply.to_date}) </p>                  
                    <Button className="btn btn-danger px-2 m-2" onClick={onCancel}>Cancel</Button>
                    <Button onSubmit={onSubmit} className="btn btn-success px-2">Save</Button>
                </Modal.Body>
            </Modal>      
        </>      
       
    )
}
export default CasualLeavel;


