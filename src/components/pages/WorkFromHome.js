import { Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import DatePicker    from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react'
import './leave.css'
import instance from '../../service/service'
import moment from 'moment'

const WorkFromHome =({work_from_home})=>{
    const format_date = "YYYY-MM-DD"
    const [tot_day_count]=useState(20)

    const addDays = (date, period) => {
        return date.setDate(date.getDate() + period);
    };

    const [startDate, setStartDate] = useState(addDays(new Date(),4));
    const [endDate, setEndDate] = useState(addDays(new Date(),4));
    const [work_from_home_reason,setWork_from_home_reason]=useState('')

    const [show,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [wfh_show, setWfh_show]=useState(false)

    

    const wfh_handleShow =()=> {
        setWfh_show(true);
        console.log(wfh_show);
    }
    const wfh_handleClose =()=> setWfh_show(false)
    const start = moment(startDate);
    const end = moment(endDate)
    console.log(end.day() - start.day())
    const work_from_home_apply ={
        from_date: moment(startDate).format(format_date),
        to_date: moment(endDate).format(format_date),
        type_of_leave: work_from_home.type_of_leave,
        description: work_from_home_reason,
    }
    const item = JSON.parse(localStorage.getItem('data'))
    console.log(item)

    const onSubmit=()=>{    

        if(item.role === "trainee" && item.token !== null){
            if(startDate < endDate){
                instance.post(process.env.REACT_APP_APPLY_LEAVE ,work_from_home_apply)
                .then( res => {
                    console.log(res.data)
                    setStartDate('')
                    setEndDate('')
                    setWork_from_home_reason('')
                }).catch( err =>{
                    console.log(err.message)
                })
            }else{
                console.log('Please select valid date')
            }
        }else{
            if(startDate < endDate){
                instance.post(process.env.REACT_APP_APPLY_LEAVE ,work_from_home_apply)
                .then( res => {
                    console.log(res.data)
                    setStartDate('')
                    setEndDate('')
                    setWork_from_home_reason('')
                }).catch( err =>{
                    console.log(err.message)
                })
            }else{
                console.log('Please select valid date')
            }
        }
     
    }
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
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body className="text-decoration-none"> 
                    <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${typeof  work_from_home.per_year === 'undefined' ? 0: work_from_home.per_year * 100 }`/`${tot_day_count}`} text={`${work_from_home.per_year === undefined ? 0: work_from_home.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
                    {/* <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto">
                        <CircularProgressbar value={100} text="8/20" styles={buildStyles({textSize: '21px',})}/>                             
                    </div> */}
                    <Card.Subtitle className="mb-3 mt-4 text-secondary">
                        Work Form Home
                    </Card.Subtitle>                        
                    <div className="  mt-2 mb-2 text-center ">
                        <Button onClick={handleShow}  disabled={work_from_home.is_wfh === 0 && work_from_home.per_year > 0 ? false: true}>Apply</Button>
                    </div>                
                </Card.Body>
            </Card> 
            <Modal show={show} onHide={handleClose} size="lg" centered> 
                <Modal.Header closeButton>
                    <Modal.Title>Work From Home</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs className="text-start mt-2 mb-2 mx-2">
                        <Row>
                            <h6 className="mb-3 mt-1">Date:</h6>
                            <Col md sm={6} className='mb-3'>  
                                <DatePicker className='form-control'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Col>
                            <Col md sm={6} className='mb-3'>
                                <DatePicker className='form-control'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={addDays(new Date(),4)}
                                    maxDate={addDays(new Date(),30)}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-3" value={work_from_home_reason} onChange={onWorkfromhome}/>
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