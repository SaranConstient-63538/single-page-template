import React, {useState,useEffect} from 'react';
import { Row, Col,Card, Table, Button, Modal } from 'react-bootstrap';
import Permissionslider    from './Permissionslider';
import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service'
import LeaveListTab from './LeaveListTab'
import moment from 'moment'
import * as Ai from 'react-icons/ai'

const TlDashboard = () => {   
    // let user_list;
    const [order,setOrder ]=useState('ASC')
    const [sick_leave, setSick_leave]=useState('')
    const [casual_leave, setCasual_leave]=useState("")
    const [work_from_home, setWork_from_home]=useState('')
    const [userList, setUserList]=useState([])
    const items = JSON.parse(localStorage.getItem('data'))
    const [btn_req_show, setBtn_req_show]=useState(false)

    const req_handleShow =()=>{
        setBtn_req_show(true)        
    }
    const req_handleClose =()=> setBtn_req_show(false)
    // console.log(btn_req)
    useEffect(()=>{         
            instance.post(process.env.REACT_APP_LEAVELIST,).then(res =>{
                console.log( res.data);
                for( var i=0; i< res.data.result.length;i++){
                    if(res.data.result[i].type_of_leave === "sick_leave"){
                        setSick_leave(res.data.result[i])
                    }else if(res.data.result[i].type_of_leave === "casual_leave"){
                        setCasual_leave(res.data.result[i]) 
                    }else if(res.data.result[i].type_of_leave === "work_from_home"){
                        setWork_from_home(res.data.result[i])
                    }
                }
            }).catch( err =>{
                console.log(err.message)
            }) 
            instance.get(process.env.REACT_APP_USERS_LEAVELIST).then(res => {
                console.log(res.data)
                setUserList(res.data)
                // user_list = res.data
                // console.log('api',user_list)
                // user_list.sort((a,b)=> a.from_date.localeCompare(b.from_date))
                // setUserList(user_list)
            }) 
          
    },[])
    useEffect(()=>{
        
        
      
    },[])
    const onSorting =(col)=>{
        if(order === 'ASC'){
            const sorted = [...userList].sort((a,b)=>
                a[col]>b[col] ? 1 :-1
              
            )
            setUserList(sorted)
            setOrder('DSC')
        }
        if(order === 'DSC'){
            const sorted = [...userList].sort((a,b)=>
                a[col]>b[col]? 1 : -1
            )
            setUserList(sorted)
            setOrder('ASC')
        }
    }
    
  return (
    <>  
        <Card className="border mt-4 mb-4 px-2 mx-3 m-auto shadow-lg rounded-4">
            <Row className='pt-5 mt-5 align-items-center px-5'>
                <Col>
                    <p className='text-start text-capitalize fw-bold fs-4 m-0'>welcome  {items.username}</p>                
                </Col>
                <Col className="text-end">
                    <Button className="btn lr-btn border-0 rounded-pill text-capitalize fw-bold shadow" onClick={req_handleShow} >leave request</Button>
                </Col>
            </Row>            
            <LeaveListTab />
        </Card>
    
        <Modal show={btn_req_show} onHide={req_handleClose} size="xl" centered>
            <Modal.Header closeButton>
            <p className='text-capitalize fw-bold m-0 fs-5'>leave request</p>          
            </Modal.Header>
            <Modal.Body> 
                <>
                    <div className="py-5">            
                        <Col >
                            <Row className="justify-content-around">   
                                <Col sm md>
                                    <Permissionslider  />                    
                                </Col>
                                <Col sm md>
                                    <SickLeave sick_leave = {sick_leave} />
                                </Col>
                                <Col sm md>
                                    <CasualLeavel  casual_leave={casual_leave}/>
                                </Col>
                                <Col sm md>
                                    <WorkFromHome work_from_home={work_from_home}/>                  
                                </Col>
                            </Row>                
                        </Col>                
                    </div>
                    <Card className="">
                        <Col className="px-3 py-3 mt-3 mb-3">
                            <Table striped bordered hover responsive className='caption-top'>
                                <caption>                
                                    <h4 className='text-start'>My leaves</h4>
                                </caption>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th onClick={()=> onSorting('from_date')}>
                                            From Date <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                        </th>
                                        <th onClick={()=> onSorting('to_date')}>
                                            To Date <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                        </th>
                                        <th onClick={() =>onSorting('type_leave')}>
                                            Type of Leave <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                        </th>
                                        <th onClick={()=> onSorting('leave_reason')}>
                                            Leave Reason  <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                        </th>
                                        <th onClick={()=> onSorting('approve')}>
                                            Approval Status <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto">
                                    { userList && userList.length > 0 ?
                                        userList.map((item,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{idx +  1}</td>
                                                    <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                    <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                    <td>{item.type_of_leave === 'sick_leave'? 'Sick Leave': item.type_of_leave === 'casual_leave' ? 'Casual Leave':item.type_of_leave === 'work_from_home' ? 'Work From Home':item.type_of_leave === 'permission' ? 'Permission': '' }</td>                                      
                                                    <td>{item.description}</td>
                                                    <td>
                                                        {item.status === 0 ?(
                                                            <p className='fs-6' >Waiting for Approval</p>
                                                        ):(
                                                            <p>Approved</p>
                                                        )
                                                    } 
                                                    </td>
                                                </tr>
                                            )
                                        }): <h6> No Record Founded</h6>
                                    }
                                </tbody>   
                            </Table>
                        </Col>
                    </Card>
                </>  
            </Modal.Body>
        </Modal>   
    </>
  )
}

export default TlDashboard