import React,{useState, useEffect} from 'react'
import { Col, Table, Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import SpecificEmp from './SpecificEmp'

const LeaveListTab = () => {
    const [sick,setSick]=useState('')
    const [wrk_home,setWrk_home]=useState('')
    const [casual,setCasual]=useState('')
    const [permission,setPermission]=useState('')
    const [_id, set_id]=useState('')

    const [list, setList]=useState([])
    const [specific_list, setSpecific_list]= useState([])
    const [id,setId]=useState('')
    
    const [show, setShow]=useState(false)
    const [_show, _setShow]=useState(false)
    const [spec_show, setSpec_show] =useState(false)
    const [type_leave,setType_leave]=useState('')

    const [leavetype, setLeavetype]=useState('')
    const [btn_status, setBtn_status]=useState(0);// status
    const [status_des, setStatus_des]=useState('');//description
    const [frm_date,setFrom_date]=useState('')//from date
    const [emp_id, setEmp_id]=useState('') //emp id 

    const index = 0
    // console.log(process.env.REACT_APP_SPECIFIC_LEAVELIST);
    useEffect(() => {
        
      instance.get(process.env.REACT_APP_APPROVALIST).then( res =>{
        // console.log(res.data.result);
        setList(res.data.result)
      })
 
      
    }, [])
    // console.log(list)

    const onApproved =()=>{
        // console.log('approved')
        const appStatus={
            status: btn_status,
            type_of_leave: leavetype,
            status_description: status_des,
            leave_master_id: emp_id,
            from_date: frm_date,
        }
       
        const approved = list.filter( item => item.from_date === frm_date && item.type_of_leave === leavetype)
        // console.log(leavetype,approved)
        if(approved){
            instance.post(process.env.REACT_APP_APPROVALUPDATE,appStatus)
            .then( res =>{
                // console.log(res.data);
                setStatus_des('')
                setFrom_date('')
            }).catch(err =>{
                console.log(err.message)
            })
        }
       
    }
    const onRejected =()=>{
        
        const appStus={
            status: btn_status,
            type_of_leave: leavetype,
            status_description: status_des,
            leave_master_id: emp_id,
            from_date: frm_date,
        }       
       const rejected = list.filter( item => item.from_date === frm_date && item.type_of_leave === leavetype)
    //    console.log(rejected)
        if(rejected){
            // console.log('rejected')
             instance.post(process.env.REACT_APP_APPROVALUPDATE,appStus)
            .then( res =>{
                // console.log(res.data,'test');
                setStatus_des('')
                setFrom_date('')
            }).catch(err =>{
                console.log(err.message)
            })
        }
      
    }
    // const spec_list = 
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
                            <th>Employee Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>    
                            <th>View Status</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{      
                                if( item.type_of_leave === 'casual_leave' && item.status === 0){
                                    return(
                                        <tr key={idx}>
                                            <td>{item.updated_by}</td>
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
                                                            console.log(id && item.leave_master_id, id, item.leave_master_id)
                                                            setBtn_status(1)
                                                            setEmp_id(item.leave_master_id)
                                                            setLeavetype(item.type_of_leave) 
                                                            setFrom_date(moment.utc(item.from_date).format('YYYY-MM-DD'))
                                                        }
                                                    }>Approved</Button>
                                                    <Button className="btn-danger btn btn-sm-danger m-1" onClick={
                                                        ()=>{
                                                         
                                                            setId(idx)   
                                                        
                                                            _setShow(true)                                                                
                                                            setBtn_status(2)
                                                            setEmp_id(item.leave_master_id)
                                                            setLeavetype(item.type_of_leave)  
                                                            setFrom_date(moment.utc(item.from_date).format('YYYY-MM-DD'))                                                              
                                                        }
                                                    }>Rejected</Button>
                                                </>
                                            </td>   
                                            <td>
                                                {item.type_of_leave && item.leave_master_id ? (
                                                        <Button
                                                            onClick={()=>{
                                                                // console.log(item)
                                                                setSpec_show(true)
                                                                // setPermission(item.type_of_leave)
                                                                // set_id(item.leave_master_id)
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    ):''
                                                }                                    
                                            </td>
                                                                                   
                                        </tr>
                                    ) 
                                }
                            }                     
                        )}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="Sick" title="Sick">
                <Table className="table-responsive">
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>Employee Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            <th> View Status</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{
                            if(item.type_of_leave === "sick_leave" &&  item.status === 0){
                                return(
                                    <tr key={idx}>

                                        {/* <td>{idx + 1}</td> */}
                                        <td>{item.updated_by}</td>
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.to_date).format('YYYY-MM-DD')}</td>
                                        <td>{item.no_of_days}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <>
                                                <Button className="btn btn-sm btn-secondary m-2" onClick={
                                                    ()=>{
                                                        setShow(true)                                                                
                                                        setBtn_status(1)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Approve</Button>
                                                <Button className="btn btn-sm btn-primary m-2" onClick={
                                                    ()=>{
                                                        _setShow(true)                                                                
                                                        setBtn_status(2)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Reject</Button>
                                            </>
                                        </td>
                                        <td>
                                            {item.type_of_leave && item.leave_master_id ? (
                                                <Button
                                                    onClick={()=>{
                                                        console.log(item)
                                                        setSpec_show(true)
                                                    }}
                                                >
                                                    View
                                                </Button>):''
                                            }                                      
                                        </td>
                                        
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="Work" title="Work From Home">
                <Table responsive>
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>Employee Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>No of Days</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item,idx)=>{
                            if(item.type_of_leave === "work_from_home" && item.status === 0){
                                return(
                                    <tr key={idx}>
                                         <td>{item.updated_by}</td>
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
                                                }>Approve</Button>
                                                <Button className="btn-danger btn btn-sm-danger m-1" onClick={
                                                    ()=>{
                                                        _setShow(true)                                                                
                                                        setBtn_status(2)
                                                        setEmp_id(item.leave_master_id)
                                                        setLeavetype(item.type_of_leave)                                                                
                                                    }
                                                }>Reject</Button>
                                            </>
                                        </td>
                                        <td>
                                            {item.type_of_leave && item.leave_master_id ? (
                                                <Button
                                                    onClick={()=>{
                                                        console.log(item)
                                                        setSpec_show(true)
                                                    }}
                                                >
                                                    View
                                                </Button>):''
                                            }                             
                                        </td>
                                       
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="permission" title="Permission">
                <Table responsive>
                    <thead>
                        <tr>
                            {/* <th>S.No</th> */}
                            <th>Employee Name</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>No of Hours</th>
                            <th>Leave of Reason</th>
                            <th>Approval Status </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {list.map( (item,idx) =>{
                            if(item.type_of_leave === "permission"){
                                return(
                                    <tr key={idx}>
                                        <td>{item.updated_by}</td>
                                        <td>{moment.utc(item.from_date).format('YYYY-MM-DD')}</td>
                                        <td>{moment.utc(item.from_date).format('h:mm a')}</td>
                                        <td>{moment.utc(item.to_date).format('h:mm a')}</td>
                                        <td>{item.no_of_hours}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <Button className="btn btn-sm btn-secondary m-2">Approve</Button>
                                            <Button className="btn btn-sm btn-primary m-2">Reject</Button>
                                        </td>
                                       <td>
                                            {/* <SpecificEmp leave={item.type_of_leave} mst_id={item.leave_master_id} item={list} /> */}
                                            {item.type_of_leave && item.leave_master_id ? (
                                                <Button
                                                    onClick={()=>{
                                                        // console.log(item)
                                                        setSpec_show(true)
                                                        // setPermission(item.type_of_leave)
                                                        // set_id(item.leave_master_id)
                                                    }}
                                                >
                                                    View
                                                </Button>):''
                                            }                                      
                                        </td>
                                    </tr>
                                )
                            }
                            
                        })}
                    </tbody>
                </Table>
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
            <Modal show={_show} onHide={()=> _setShow(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Status Description</Form.Label>
                        <Form.Control value={status_des} onChange={(e)=>setStatus_des(e.target.value)} type="text"/>
                        <Form.Label>From Date</Form.Label>
                        <Form.Control value={frm_date} onChange={(e)=>setFrom_date(e.target.value)} type="text" />
                    </Form>
                    <Button onClick={onRejected}>Save</Button>
                </Modal.Body>
            </Modal>
            <Modal show={spec_show} onHide={()=> setSpec_show(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Specfic Employee List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>No of days or No of hours</th>
                                <th>description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {   list.map( (itm,idx)=>{ 
                            console.log(itm.type_of_leave === 'permission')
                            if(itm.type_of_leave === 'permission'  ){
                                return(
                                    (
                                        <tr key={idx}>
                                            <td>{itm.updated_by}</td>
                                            <td>{itm.from_date}</td>
                                            <td>{itm.to_date}</td>
                                            <td>{itm.no_of_hours}</td>
                                            <td>{itm.description}</td>
                                            <td>{itm.status === 0 ? 'Waiting' : itm.status === 1 ? 'Approved' : 'Rejected'}  </td>
                                        </tr>
                                    )
                                )
                            }else if(itm.type_of_leave === 'sick' ){
                                return(
                                    (
                                        <tr key={idx}>
                                            <td>{itm.updated_by}</td>
                                            <td>{itm.from_date}</td>
                                            <td>{itm.to_date}</td>
                                            <td>{itm.no_of_hours}</td>
                                            <td>{itm.description}</td>
                                            <td>{itm.status === 0 ? 'Waiting' : itm.status === 1 ? 'Approved' : 'Rejected'}  </td>
                                        </tr>
                                    )
                                )
                            }else if(itm.type_of_leave === 'sick' ){
                                return(
                                    (
                                        <tr key={idx}>
                                            <td>{itm.updated_by}</td>
                                            <td>{itm.from_date}</td>
                                            <td>{itm.to_date}</td>
                                            <td>{itm.no_of_hours}</td>
                                            <td>{itm.description}</td>
                                            <td>{itm.status === 0 ? 'Waiting' : itm.status === 1 ? 'Approved' : 'Rejected'}  </td>
                                        </tr>
                                    )
                                )
                            }
                            
                            })
                        }
                            
                           
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>
            
                        
        </>
        
        

        
    </Col>
  )
}

export default LeaveListTab