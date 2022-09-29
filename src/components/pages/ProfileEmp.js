import React from 'react'
import { Form, Card, Col, Row, Button } from 'react-bootstrap'
// import imgs from '../../asset/images/man.png'
import * as Ai from 'react-icons/ai';

const ProfileEmp = () => {
  return (
    <Col md={12} lg={12} sm={12} className="mt-3 mb-3">
        <Card>
            <Form>
                <h5 className='text-center text-primary'>Profile </h5>
                <Row className='px-3 py-3 mb-3'>                    
                    <Col md={12} sm={12} className="text-center">
                        {/* <div className='w-25 h-25'>
                            <Image src={imgs} alt="logo" roundedCircle width="auto" height="100%" bg="secondary"/>    
                        </div>
                        <Image src={imgs} alt="logo" roundedCircle width="100%" height="100%" bg="secondary"/> */}
                        <div className='rounded-circle mx-auto d-block mb-3 mt-3'>
                            <Ai.AiOutlineCamera className="position-absolute " size={50}/>
                            
                        </div>
                    </Col>                  
                </Row>
                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Col>
                </Row>

                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" placeholder="E-Mail Address" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" placeholder="" />
                    </Col>
                </Row>
                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>Gender</Form.Label>
                        <div className="d-flex justify-content-space-between">
                        <Form.Check 
                            type='checkbox' label="Male"
                        />
                          <Form.Check 
                            type='checkbox' label="Female" 
                        />
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Date Of Joining </Form.Label>
                        <Form.Control type="date" placeholder="" />
                    </Col>
                </Row>
                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>Mobil Number</Form.Label>
                        <Form.Control type="number" placeholder="Mobile Number" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Emp Code</Form.Label>
                      
                        <Form.Control type="text" placeholder="Emp Code" />
                    </Col>                        
                </Row>
                <div style={{flex: 1, height: '1px', backgroundColor: 'grey'}} />
                <h6 className="p-2 m-2">Address Details</h6>
                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>Address </Form.Label>
                        <Form.Control type="text" as="textarea" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Col>
                </Row>
                <Row className='px-3 py-3'> 
                    <Col md={6} sm={12}>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control type="text" placeholder="Pin Code" />
                    </Col>
                </Row>
                <Row className='px-3 py-3'>
                    <Col md={6} sm={12}>
                        <Form.Label>Aadhaar No</Form.Label>
                        <Form.Control type="text" placeholder="Aadhaar No" />
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label>Pan No</Form.Label>
                        <Form.Control type="text" placeholder="Pan No" />
                    </Col>
                </Row>
               
                <Col md={6} sm={12} className="p-3">
                    <Button>Save</Button>
                </Col>
            </Form>
        </Card>
    </Col>
    
  )
}

export default ProfileEmp