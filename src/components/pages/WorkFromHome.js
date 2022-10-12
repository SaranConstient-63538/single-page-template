import { Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import DatePicker    from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react'
import './leave.css'
import instance from '../../service/service'
import moment from 'moment'
import { motion } from 'framer-motion'

const WorkFromHome =({work_from_home})=>{
    const format_date = "YYYY-MM-DD"
    const [tot_day_count]=useState(20)

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

    // console.log(endDate.getDay())
    const wfh_handleShow =()=> {
        console.log(wfh_show);

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
    
        if(work_from_home_reason==''){
          errorCount++
          setInputErrors((prevState)=>{
            return{...prevState,work_from_home_reason:'* Reason Is Required'}
          })
        }else{
          setInputErrors((prevState)=>{
            return{...prevState,work_from_home_reason:''}
          })
        }
        if(errorCount==0){
          const applyForm = {startDate,endDate,work_from_home_reason}
          console.log(applyForm)
          setWfh_show(true);
        //   per_handleShow()
        }
    }
    const wfh_handleClose =()=> setWfh_show(false)
    const start = moment(startDate);
    // console.log(startDate)
    const end = moment(endDate)
   const start_date = new Date()
   const end_date = new Date()
   console.log(start_date, end_date)
    
    const work_from_home_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: work_from_home.type_of_leave,
        description: work_from_home_reason,
    }
    console.log(startDate,endDate)
    const item = JSON.parse(localStorage.getItem('data'))
    console.log(item)

    const onSubmit=()=>{  

        if(item.role === "trainee" && item.token !== null){
            console.log('trainee')
            if(startDate < endDate){
                // instance.post(process.env.REACT_APP_APPLY_LEAVE ,work_from_home_apply)
                // .then( res => {
                //     console.log(res.data)
                //     setStartDate('')
                //     setEndDate('')
                //     setWork_from_home_reason('')
                // }).catch( err =>{
                //     console.log(err.message)
                // })
            }else{
                console.log('Please select valid date')
            }
        }else{
            console.log('team_leader')
            if(startDate < endDate){
                // instance.post(process.env.REACT_APP_APPLY_LEAVE ,work_from_home_apply)
                // .then( res => {
                //     console.log(res.data)
                //     setStartDate('')
                //     setEndDate('')
                //     setWork_from_home_reason('')
                // }).catch( err =>{
                //     console.log(err.message)
                // })
            }else{
                console.log('Please select valid date')
            }
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
        setWork_from_home_reason('')
    }
    const onWorkfromhome =(e)=>{
        setWork_from_home_reason(e.target.value)
    }

    return (
        <>
            <Card  className='text-center leave-card m-auto shadow'>
                <div className='my-auto'> 
                    <Card.Subtitle  className="text-secondary mb-1 fw-semibold text-capitalize">
                        work from home
                    </Card.Subtitle>                        
                    <motion.button className='border-0 rounded-pill mt-1' whileHover={{ scale: 1.1 }}>
                        <Button onClick={handleShow} className="border-0 rounded-pill bg-success">Apply</Button>
                    </motion.button>  
                           
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
                                    dateFormat="dd/MM/yyyy"
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
                                    dateFormat="dd/MM/yyyy"
                                />
                                {inputErrors.endDate && <p className='text-danger'>{inputErrors.endDate}</p>}
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-2" value={work_from_home_reason} onChange={onWorkfromhome}/>
                        {inputErrors.work_from_home_reason && <p className='text-danger'>{inputErrors.work_from_home_reason}</p>}
                        <Button onClick={wfh_handleShow}>Submit</Button>
                    </Col>                     
                </Modal.Body>
            </Modal> 
            <Modal show={wfh_show} onHide={wfh_handleClose} size="md" centered>
                <Modal.Header closeButton>
                    Are you sure ?                
                </Modal.Header>
                <Modal.Body>      
                    <p>To apply {end.day() - start.day()}  day of Work from Home  From ({work_from_home_apply.from_date}) To ({work_from_home_apply.to_date}) </p>                  
                    <Button className="btn btn-danger px-2 m-2" onClick={onCancel}>Cancel</Button>
                    <Button onSubmit={onSubmit} className="btn btn-success px-2">Save</Button>
                </Modal.Body>
            </Modal>   

        </>
    )
}
export default WorkFromHome;