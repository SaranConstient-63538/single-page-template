import {  Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import React,{useState} from 'react'
import moment from 'moment'
import instance from '../../service/service'
import { toast } from 'react-toastify'


const CasualLeavel =({casual_leave})=>{
  
    // const format_date = "DD-MM-YYYY"
    // const [day_count, setDaycount] = useState(0)
    // const [tot_day_count, setTot_day_count]=useState(12)  
    

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
        let errorCount = 0
        if(startDate === ''){
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
    
           
        if(casual_reason === ''){
          errorCount++
          setInputErrors((prevState)=>{
            return{...prevState,casual_reason:'* Reason Is Required'}
          })
        }else{
          setInputErrors((prevState)=>{
            return{...prevState,casual_reason:''}
          })
        }
        if(errorCount === 0){
          const applyForm = {startDate,endDate,casual_reason}
          console.log(applyForm)
          setCasual_show(true);
        }
    }
    const casual_handleClose =()=> setCasual_show(false)
    const casual_apply ={
        from_date: moment(startDate).format("YYYY-MM-DD"),
        to_date: moment(endDate).format("YYYY-MM-DD"),
        type_of_leave: casual_leave.type_of_leave,
        description: casual_reason,
    }
    const onCancel =()=>{
        setStartDate('')
        setEndDate('')
        casual_handleClose()
        setCasualreason('')
        casual_handleClose()
    }
    const item = JSON.parse(localStorage.getItem('data'))
    // console.log(item.role === "trainee" && item.token !== null, startDate < endDate)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit=()=>{    
        console.log('hi')      
        if(item.role === "trainee" && item.token !== null){
            console.log(casual_apply)
            if(startDate < endDate){              
                instance.post(process.env.REACT_APP_APPLY_LEAVE,casual_apply)
                .then( res => {
                    console.log(res)
                    if(res.status === 200){
                        console.log(res.data)                   
                        setStartDate('')
                        setEndDate('')
                        setCasualreason('')
                        casual_handleClose()
                        handleClose()
                        toast.success('Successfully apply the Casual Leave',{
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }else{
                        toast.warning('Please check leave availablity',{
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    }
                    
                }).catch( err =>{
                    toast.error(`${err.message}`,{
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    console.log(err.message)
                })
            }else{
                toast.warn('Please select valid date',{
                    position: toast.POSITION.TOP_RIGHT,
                })
            }

        }else{
            if(startDate < endDate){
                instance.post(process.env.REACT_APP_APPLY_LEAVE,casual_apply)
                .then( res => {
                    console.log(res.data)                   
                    setStartDate('')
                    setEndDate('')
                    setCasualreason('')
                    casual_handleClose()
                    handleClose()
                    toast.success('Successfully apply the Casual Leave',{
                        position: toast.POSITION.TOP_RIGHT,
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
        }
    }
    const isWeekday =(date)=>{
        const day = date.getDay(date)
        return day !== 0 && day !== 6
    }
    const onCasualReason = (e)=>{
        setCasualreason(e.target.value)
    }
    return (
        <>
           <Card className='text-center leave-card m-auto shadow-lg'>
        <div className='my-auto'>
          <Card.Subtitle className="text-capitalize my-1 fw-bold">casual leave</Card.Subtitle>                            
            <Button onClick={handleShow} className="rounded-pill border-0 my-1 la-btn shadow">Apply</Button>
        </div>
      </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Casual Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs> 
                        <Row>
                            <Col md sm={6} className='mb-3'>  
                                <h6 className="mb-3 mt-1 text-capitalize">from:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    filterDate={isWeekday}  
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd-MM-yyyy"
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                                 {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
                            </Col>
                            <Col md sm={6} className='mb-3'>
                            <h6 className="mb-3 mt-1 text-capitalize">to:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}                              
                                    filterDate={isWeekday}  
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd-MM-yyyy"
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                                 {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" value={casual_reason} onChange={onCasualReason}/> 
                        {inputErrors.casual_reason && <p className='text-danger'>{inputErrors.casual_reason}</p>} 
                        <div className='text-end'>
                        <Button onClick={casual_handleShow} className="m-1 p-2 rounded-4">Submit</Button>  
                        </div>                                                               
                    </Col>              
                </Modal.Body>
            </Modal>   
            <Modal show={casual_show} onHide={casual_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                    <p>To apply the  Casual leave From: {moment.utc(casual_apply.from_date).format("DD-MM-YYYY")} To: {moment.utc(casual_apply.to_date).format("DD-MM-YYYY")} </p>                  
 
                    <Row>
                    <Col className='text-start'>
                            <Button onClick={onSubmit} className="btn btn-success p-2 m-2 rounded-4 fs-6">apply</Button>
                        </Col>
                        <Col className='text-end'>
                            <Button className="btn btn-danger p-2 m-2 rounded-4 fs-6" onClick={onCancel}>Cancel</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>      
        </>    
    )
}
export default CasualLeavel;


