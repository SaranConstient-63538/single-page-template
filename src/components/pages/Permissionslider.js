
import { Slider } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { Modal,Card, Button, Form, Col,Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import instance from '../../service/service';

function valuetext(value){
    return `${value}`;
}
const marks = [
    {
      value: 0,
      label: "9.30"
    },
    {
      value: 10,
      label: "10.30 "
    },
    {
      value: 20,
      label: "11.30 "
    },
    {
      value: 30,
      label: "12.30"
    },
    {
      value: 40,
      label: "1.30 "
    },
    {
      value: 50,
      label: "2.30 "
    },
    {
      value: 60,
      label: "3.30"
    },
    {
      value: 70,
      label: "4.30 "
    },
    {
      value: 80,
      label: "5.30 "
    },
    {
      value: 90,
      label: "6.30 "
    },
    {
      value: 100,
      label: "7.30 "
    }
  ];
const Permissionslider =()=>{
  const format_date = "YYYY-MM-DD"
  const format_time = "h:mm"
    const [date,setDate]=useState(new Date())
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [value,setValue] = useState([0,10])
    const [show,setShow]=useState(false)
    const [per_reason,setPer_reason]=useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const handleChange =(event, newVal)=>{
        console.log(newVal)
        setValue(newVal);
    }
    const onPermission =()=>{
      let _permission ={
        from_date: moment(startDate).format(format_date),  
        to_date: moment(endDate).format(format_date),
        start_time:moment(startDate).format(format_time), 
        end_time:moment(endDate).format(format_time),
        type_of_leave:'permission',
        description: per_reason,
      }
      console.log(_permission, process.env)
      instance.post(process.env.REACT_APP_PERMISSION, _permission)
      .then(res =>{
        console.log(res.data, 'success')
        setStartDate('')
        setEndDate('')
        setPer_reason('')
      }).catch( err =>{
        console.log(err.message)
      })
    } 
  

    const addDays = (date, period) =>{        
      return date.setDate(date.getDate() + period)        
  } 
    return(
      <>
        <Card className='text-center leave-card mb-2 mt-2 m-auto'>
          <Card.Body >
              {/* <Card.Link href="#" className="text-decoration-none"> */}
                  {/* <div style={{ width: 90, height: 90, margin :'auto', marginTop:'10px',fontSize:'70px',textAlign:'center' }}>
                      <CircularProgressbar value={100} text={permission} />
                  </div> */}
                  {/* <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={100} text={permission} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div> */}
                  <Card.Subtitle className="mb-3 mt-4 text-secondary">Permission</Card.Subtitle>
                  {/* <div >
                      <h6>Permission</h6>
                  </div>                         */}
                  <div className="  mt-2 mb-3 text-center ">
                  <Button onClick={handleShow} >Apply</Button>
                  </div>
              {/* </Card.Link> */}
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
              <Modal.Title>Permission Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col xs >
              <Row>
                <Col sm={6}>
                  <DatePicker
                      selected={startDate}
                      className='form-control'  
                      onChange={(date)=>setStartDate(date)}
                      minDate={addDays(new Date(), 0)}
                      dateFormat="yyyy-MM-dd hh:mm aa"
                      timeInputLabel="Time:"
                      showTimeInput
                    />
                </Col>
                <Col sm={6}>
                  <DatePicker
                      selected={endDate}
                      className='form-control'  
                      onChange={(date)=>setEndDate(date)}
                      minDate={addDays(new Date(), 0)}
                      dateFormat="yyyy-MM-dd hh:mm aa"
                      timeInputLabel="Time:"
                      showTimeInput
                    />
                </Col>
              </Row>
              {/* <div className="px-5">
                <Slider 
                  value={value}
                  marks={marks}
                  onChange={handleChange}
                  step={10}
                  getAriaValueText={valuetext}
                  className="mt-3 mb-3  "
                  sx={{margin:'auto',padding:'auto'}}
                />
              </div> */}
              
              <h6 className='mb-3 mt-3'>Reason For </h6>
              <Form.Control as="textarea" rows={3} className="mb-3" value={per_reason} onChange={(event)=> setPer_reason(event.target.value)}/>
              <Button className="mb-3" onClick={onPermission}>Submit</Button>
            </Col>
            
          </Modal.Body>
        </Modal>     
      </>
    )
}
export default Permissionslider;

