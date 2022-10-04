import React,{useState, useEffect} from 'react'
import { Col, Table, Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { useForm } from 'react-hook-form'

const LeaveListTab = () => {
    const [list, setList]=useState([])
    const [id,setId]=useState('')
    const [show, setShow]=useState(false)
    const [_show, _setShow]=useState(false)
    const [type_leave,setType_leave]=useState('')
    const [leavetype, setLeavetype]=useState('')
    const [btn_status, setBtn_status]=useState(0);// status
    const [status_des, setStatus_des]=useState('');//description
    const [frm_date,setFrom_date]=useState('')//from date
    const [emp_id, setEmp_id]=useState('') //emp id 

    const index = 0
    useEffect(() => {
      instance.get(process.env.REACT_APP_APPR_LIST).then( res =>{
        console.log(res.data)
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
        
        console.log(appStatus)
            // setStatus_des('')
            // setFrom_date('')
        
            // instance.post('/approvalUpdate',appStatus)
            // .then( res =>{
            //     console.log(res.data, 'test');
            // }).catch(err =>{
            //     console.log(err.message)
            // })
        
        
       
        
    }
    // const onRejected =()=>{
    //     const _appStatus ={
    //         status: btn_status,
    //         type_of_leave: leavetype,
    //         status_description: status_des,
    //         leave_master_id: emp_id,
    //         from_date: frm_date,
    //     }
    //     console.log(_appStatus)
    //     if(list.type_of_leave === "casual_leave" && list.leave_master_id !== ""){
    //         instance.post('/approvalUpdate',_appStatus)
    //         .then( res =>{
    //             console.log(res.data);
    //         }).catch(err =>{
    //             console.log(err.message)
    //         })
    //     }
       
    // }
  return (
    <Col className="px-3 py-3 mt-3 mb-3">     
        <Tabs
            defaultActiveKey="Casual"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
        >
            <Tab eventKey="Casual" title="Casual">
                <Table responsive>
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
                                if( item.type_of_leave === 'casual_leave' && item.status === 0){
                                    return(
                                        <tr key={idx}>
                                            <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                            <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                            <td>{item.no_of_days}</td>
                                            <td>{item.description}</td>
                                            <td>    
                                            
                                                    <>
                                                    <Button className="btn-success btn btn-sm-success m-1" onClick={
                                                        ()=>{
                                                            setShow(true)  
                                                            setId(idx)   
                                                            console.log(id)
                                                            if(id && item.leave_master_id){
                                                                setBtn_status(1)
                                                                setEmp_id(item.leave_master_id)
                                                                setLeavetype(item.type_of_leave) 
                                                                setFrom_date(moment.utc(item.from_date).format('YYYY-MM-DD'))
                                                            }
                                                                                                               
                                                                                                                          
                                                        }
                                                    }>Approved</Button>
                                                    {/* <Button className="btn-danger btn btn-sm-danger m-1" onClick={
                                                        ()=>{
                                                            _setShow(true)                                                                
                                                            setBtn_status(2)
                                                            setEmp_id(item.leave_master_id)
                                                            setLeavetype(item.type_of_leave)                                                                
                                                        }
                                                    }>Rejected</Button> */}
                                                </>
                                                                               
                                                
                                            </td>
                                            <td>{item.updated_by}</td>
                                        </tr>
                                    ) 
                                }
                            }                     
                        )}
                    </tbody>
                </Table>
            </Tab>
            {/* <Tab eventKey="Sick" title="Sick">
                <Table>
                    <thead>
                        <tr>
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
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <>
                                                <Button className="btn-success btn btn-sm-success m-1" onClick={
                                                    ()=>{
                                                        setShow(true)                                                                
                                                        setBtn_status(1)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Approved</Button>
                                                <Button className="btn-danger btn btn-sm-danger m-1" onClick={
                                                    ()=>{
                                                        _setShow(true)                                                                
                                                        setBtn_status(2)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Rejected</Button>
                                            </>
                                            
                                        </td>
                                        <td>{item.updated_by}</td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab> */}
            {/* <Tab eventKey="Work" title="Work From Home">
            <Table responsive className="overflow-scroll ">
                    <thead>
                        <tr>
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
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <>
                                                <Button className="btn-success btn btn-sm-success m-1" onClick={
                                                    ()=>{
                                                        setShow(true)                                                                
                                                        setBtn_status(1)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Approved</Button>
                                                <Button className="btn-danger btn btn-sm-danger m-1" onClick={
                                                    ()=>{
                                                        _setShow(true)                                                                
                                                        setBtn_status(2)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Rejected</Button>
                                            </>
                                        </td>
                                        <td>{item.updated_by}</td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab> */}
            <Tab eventKey="permission" title="Permission">
                <p>Permission</p>
            </Tab>
        
        </Tabs>  
        <>
            <Modal show={show} onHide={()=> setShow(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Status Description</Form.Label>
                        <Form.Control value={status_des} onChange={(event)=>setStatus_des(event.target.value)} type="text"/>
                        <Form.Label>From Date</Form.Label>
                        <Form.Control value={frm_date} onChange={(event)=>setFrom_date(event.target.value)} type="text" />
                        <Button onClick={onApproved}>Save</Button>
                    </Form>
                    
                </Modal.Body>
            </Modal>
            {/* <Modal show={_show} onHide={()=> _setShow(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Status Description</Form.Label>
                        <Form.Control value={status_des} onChange={(e)=>setStatus_des(e.target.value)} type="text"/>
                        <Form.Label>From Date</Form.Label>
                        <Form.Control value={frm_date} onChange={(e)=>setFrom_date(e.target.value)} type="date" />
                    </Form>
                    <Button onSubmit={onRejected}>Save</Button>
                </Modal.Body>
            </Modal> */}
        
        </>
        
        

        
    </Col>
  )
}

export default LeaveListTab