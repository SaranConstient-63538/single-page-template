import { Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import DatePicker    from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react'
import './leave.css'
import instance from '../../service/service'
import moment from 'moment'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const WorkFromHome =({work_from_home})=>{
    const format_date = "YYYY-MM-DD"   
     const addDays = (date, period) => {
        return date.setDate(date.getDate() + period);
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [work_from_home_reason,setWork_from_home_reason]=useState('')

    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [wfh_show, setWfh_show]=useState(false)

    const [inputErrors,setInputErrors] = useState({startDate:'',endDate:'',work_from_home_reason})

    const wfh_handleShow =()=> {
        let errorCount=0
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
    
        if(work_from_home_reason === ''){
          errorCount++
          setInputErrors((prevState)=>{
            return{...prevState,work_from_home_reason:'* Reason Is Required'}
          })
        }else{
          setInputErrors((prevState)=>{
            return{...prevState,work_from_home_reason:''}
          })
        }
        if(errorCount === 0){
          const applyForm = {startDate,endDate,work_from_home_reason}
          console.log(applyForm)
          setWfh_show(true);
        }
    }
    const wfh_handleClose =()=> setWfh_show(false)
    
    const work_from_home_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: work_from_home.type_of_leave,
        description: work_from_home_reason,
    }
  
    // const item = JSON.parse(localStorage.getItem('data'))
    // console.log(item)

    const onSubmit=()=>{      
          
        if(startDate < endDate){
            instance.post(process.env.REACT_APP_APPLY_LEAVE ,work_from_home_apply)
            .then( res => {
                console.log(res.data)
                setStartDate('')
                setEndDate('')
                setWork_from_home_reason('')
                wfh_handleClose()
                handleClose()
                toast.success('Successfully apply the Work from Home',{
                    position: toast.POSITION.BOTTOM_LEFT,
                })

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
            console.log('Please select valid date')
        }
    
     
    }
    const isWeekday =(date)=>{
        const day = date.getDay(date)
        return day !== 0 && day !== 6
    }
    // getDateCount =(startDate,endDate)=>{
    //     var curDate = startDate.getDay()
    //     while(curDate <= endDate){
    //         var dofweek = curDate.getDay()
    //     }
    // }
    const onCancel =()=>{
        console.log('cancel')
        setStartDate('')
        setEndDate('')
        wfh_handleClose()
        setWork_from_home_reason('')
        wfh_handleClose();
    }
    const onWorkfromhome =(e)=>{
        setWork_from_home_reason(e.target.value)
    }

    return (
        <>
           <Card className='text-center leave-card m-auto shadow-lg'>
        <div className='my-auto'>
          <Card.Subtitle className="text-uppercase my-1 fw-bold">wfh</Card.Subtitle>                            
            <Button onClick={handleShow} className="rounded-pill border-0 my-1 la-btn shadow">Apply</Button>
        </div>
      </Card>
            <Modal show={show} onHide={handleClose} size="lg" centered> 
                <Modal.Header closeButton>
                    <Modal.Title>Work From Home</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs className="text-start mt-2 mb-2 mx-2">
                        <Row>
                            
                            <Col md sm={6} className='mb-3'>  
                                <h6 className="mb-3 mt-1">Start Date:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={startDate}
                                    onChange={(date) => {setStartDate(date)} }                                
                                    filterDate={isWeekday}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd-MM-yyyy"
                                />
                                {inputErrors.startDate && <p className='text-danger'>{inputErrors.startDate}</p>}
                            </Col>
                            <Col md sm={6} className='mb-3'>
                                <h6 className="mb-3 mt-1">End Date:</h6>
                                <DatePicker className='form-control mb-2'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    filterDate={isWeekday}                                   
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd-MM-yyyy"
                                />
                                {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" value={work_from_home_reason} onChange={onWorkfromhome}/>
                        {inputErrors.work_from_home_reason && <p className='text-danger'>{inputErrors.work_from_home_reason}</p>}
                        <Button onClick={wfh_handleShow} className="m-1 p-2 rounded-4">Submit</Button>
                    </Col>                     
                </Modal.Body>
            </Modal> 
            <Modal show={wfh_show} onHide={wfh_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                   <p>To apply the Work from Home  From : {moment.utc(work_from_home_apply.from_date).format('DD-MM-YYYY')} To : {moment.utc(work_from_home_apply.to_date).format('DD-MM-YYYY')} </p>                  
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
export default WorkFromHome;