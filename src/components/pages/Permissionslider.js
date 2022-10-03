
import { Slider } from '@mui/material'
import React, {useState} from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { Modal,Card, Button, Form, Col } from 'react-bootstrap';

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
    const date = new Date();
    const [value,setValue] = useState([0,10])
    const [show,setShow]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const handleChange =(event, newVal)=>{
        console.log(newVal)
        setValue(newVal)
    }
    let permission=0;
    return(
      <>
        <Card className='text-center leave-card mb-2 mt-2 m-auto'>
          <Card.Body >
              {/* <Card.Link href="#" className="text-decoration-none"> */}
                  {/* <div style={{ width: 90, height: 90, margin :'auto', marginTop:'10px',fontSize:'70px',textAlign:'center' }}>
                      <CircularProgressbar value={100} text={permission} />
                  </div> */}
                  <div style={{ width: 80, height: 80, marginTop:'10px',fontSize:'30px' }} 
                        className="d-flex text-center m-auto text-secondary">
                        <CircularProgressbar value={100} text={permission} styles={buildStyles({textSize: '25px',textColor: 'black',fontSize:'25px'})}/>                             
                    </div>
                  <Card.Subtitle className="mb-3 mt-4 text-secondary">Permission</Card.Subtitle>
                  {/* <div >
                      <h6>Permission</h6>
                  </div>                         */}
                  <div className="  mt-2 mb-3 text-center ">
                  <Button onClick={handleShow}>Apply</Button>
                  </div>
              {/* </Card.Link> */}
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
              <Modal.Title>Permission Leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md={6} className="w-100 m-auto">
              <div className="px-5">
                <Slider 
                  value={value}
                  marks={marks}
                  onChange={handleChange}
                  step={10}
                  getAriaValueText={valuetext}
                  className="mt-3 mb-3  "
                  sx={{margin:'auto',padding:'auto'}}
                />
              </div>
              
              <h6 className='mb-3 mt-3'>Reason For </h6>
              <Form.Control as="textarea" rows={3} className="mb-3"/>
              <Button className="mb-3">Submit</Button>
            </Col>
            
          </Modal.Body>
        </Modal>     
      </>
    )
}
export default Permissionslider;

