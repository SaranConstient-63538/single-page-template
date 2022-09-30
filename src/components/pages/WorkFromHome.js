import { Row, Col, Modal, Card, Button, Form} from 'react-bootstrap'
import { buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import DatePicker    from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react'
import './leave.css'


const WorkFromHome =({work_from_leave})=>{
    // console.log(work_from_leave)
    const [day_count, setDaycount] = useState(0)
    const [tot_day_count, setTot_day_count]=useState(20)
  const [startDate, setStartdate]=useState(new Date())
  const [endDate, setEnddate]=useState(new Date())
  const [show,setShow]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    // const workfromhome = 8/20;
    const addDays = (date, period) =>{
        return date.setDate(date.getDate() + period)        
    }    
    // console.log(show)
    return (
        <>
            <Card className='text-center leave-card mb-2 mt-2 m-auto'>
                <Card.Body className="text-decoration-none"> 
                    <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={`${work_from_leave.per_year * 100 }`/`${tot_day_count}`} text={`${work_from_leave.per_year}/${tot_day_count}`} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
                    {/* <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto">
                        <CircularProgressbar value={100} text="8/20" styles={buildStyles({textSize: '21px',})}/>                             
                    </div> */}
                    <Card.Subtitle className="mb-3 mt-4 text-secondary">
                        Work Form Home
                    </Card.Subtitle>                        
                    <div className="  mt-2 mb-2 text-center ">
                        <Button onClick={handleShow}  disabled={work_from_leave.is_wfh === 1 ? true : false}>Apply</Button>
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
                                    onChange={(date)=> setStartdate(date)}
                                    selectsStart
                                    // startDate={startDate}                                    
                                    // endDate={startDate}
                                    maxDate={addDays(new Date(),0)}
                                    dateFormat="dd-MM-yyyy"
                                /> 
                            </Col>
                            <Col md sm={6} className='mb-3'>
                                <DatePicker className='form-control '
                                    // dateFormat="dd/MM/yyyy"
                                    selected={endDate}
                                    onChange={(date)=>setEnddate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    maxDate={endDate}
                                    dateFormat="dd-MM-yyyy"
                                                                          
                                />  
                            </Col>
                        </Row> 
                        <h6 className='mb-3 mt-3'>Reason For </h6>
                        <Form.Control as="textarea" rows={3} className="mb-3"/>
                        <Button>Submit</Button>
                    </Col>                     
                </Modal.Body>
            </Modal>                  
        </>
    )
}
export default WorkFromHome;