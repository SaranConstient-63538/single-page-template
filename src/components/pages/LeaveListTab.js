import React,{useState, useEffect} from 'react'
import { Col, Table, Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { useForm } from 'react-hook-form'

const LeaveListTab = () => {
    const [list, setList]=useState([])
    
    const [show, setShow]=useState(false)

    const [leavetype, setLeavetype]=useState('')
    const [btn_status, setBtn_status]=useState(0);// status
    const [status_des, setStatus_des]=useState('');//description
    const [frm_date,setFrom_date]=useState('')//from date
    const [emp_id, setEmp_id]=useState('') //emp id 

    const index = 0
    useEffect(() => {
       instance.get('/approvalList').then( res =>{
            console.log(res.data)
            setList(res.data.result)
       })
    }, [])
 

    const onApproved =()=>{
        const appStatus={
            status: btn_status,
            type_of_leave: leavetype,
            status_description: status_des,
            leave_master_id: emp_id,
            from_date: frm_date,

        }
        instance.post('/approvalUpdate',appStatus)
        .then( res =>{
            console.log(res.data);
        }).catch(err =>{
            console.log(err.message)
        })
       
        
    }
  return (
    <Col className="px-3 py-3 mt-3 mb-3">     
        <Tabs
            defaultActiveKey="Casual"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
        >
            <Tab eventKey="Casual" title="Casual">
                <Table>
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            <th>Applied By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{
                            if(item.type_of_leave === "casual_leave"){
                                return(
                                    <tr key={idx}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            {
                                                item.status === 0 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1" onClick={
                                                            ()=>{
                                                                setShow(true)
                                                                if(item.type_of_leave === 'casual_leave'){
                                                                    setBtn_status(1)
                                                                    console.log(btn_status, item.leave_master_id)
                                                                    setEmp_id(item.leave_master_id)
                                                                    setLeavetype(item.type_of_leave)
                                                                }
                                                            }
                                                        }>Approved</Button>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                ):item.status === 1 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1">Approved</Button>
                                                    </>
                                                ):(
                                                    <>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                )
                                                
                                            }
                                        </td>
                                        <td>{item.updated_by}</td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="Sick" title="Sick">
                <Table>
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            <th>Applied By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{
                            if(item.type_of_leave === "sick_leave"){
                                return(
                                    <tr key={idx}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            {
                                                item.status === 0 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1" >Approved</Button>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                ):item.status === 1 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1">Approved</Button>
                                                    </>
                                                ):(
                                                    <>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                )
                                            }
                                            
                                        </td>
                                        <td>{item.updated_by}</td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="Work" title="Work From Home">
            <Table responsive className="overflow-scroll ">
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            <th>Applied By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{
                            if(item.type_of_leave === "work_from_home"){
                                return(
                                    <tr key={idx}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            {
                                                item.status === 0 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1">Approved</Button>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                ):item.status === 1 ? (
                                                    <>
                                                        <Button className="btn-success btn btn-sm-success m-1" onClick={onApproved(item.type_of_leave)}>Approved</Button>
                                                    </>
                                                ):(
                                                    <>
                                                        <Button className="btn-danger btn btn-sm-danger m-1">Rejected</Button>
                                                    </>
                                                )
                                            }
                                        </td>
                                        <td>{item.updated_by}</td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="permission" title="Permission">
                <p>Permission</p>
            </Tab>
        
        </Tabs>  
        <Modal show={show} onHide={()=> setShow(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Status Description</Form.Label>
                    <Form.Control value={status_des} onChange={(e)=>setStatus_des(e.target.value)} type="text"/>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control value={frm_date} onChange={(e)=>setFrom_date(e.target.value)} type="date" />
                </Form>
                <Button onClick={onApproved}>Save</Button>
            </Modal.Body>
        </Modal>

        
    </Col>
  )
}

export default LeaveListTab