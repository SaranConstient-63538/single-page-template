import React,{useState, useEffect} from 'react'
import { Col, Table, Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { useForm } from 'react-hook-form'

import LeaveListTable from '../tables/LeaveListTable'
import PerLeaveListTable from '../tables/PerLeaveListTable'

const LeaveListTab = () => {
    //header columns
    const leavelistCol =[
        {field:'id',header:'S.No'},
        {field:'updated_by',header:'Emp Name'},
        {field:'from_date',header:'Start Date'},
        {field:'to_date',header:'End Date'},
        {field:'no_of_days',header:'Days'},
        {field:'description',header:'Reason'},
        {field:'button',header:'Approval status'},
        {field:'action',header:'Action'},
    ]
    
    const [_key, setKey]=useState('casual_leave')
    const [list, setList]=useState([])
    const [view,setView]=useState([]);
    const [id,setId]=useState('')

    const [cas_len, setCas_len] = useState('')
    const [sic_len, setSic_len] = useState('')
    const [wfh_len, setWfh_len] = useState('')
    const [per_len, setPer_len] = useState('')
    
    const [show, setShow]=useState(false)
    const [_show, _setShow]=useState(false)
    const [count, setCount]=useState([])
    const [spec_show, setSpec_show] =useState(false)

    const [leavetype, setLeavetype]=useState('')
    const [btn_status, setBtn_status]=useState(0);// status
    const [status_des, setStatus_des]=useState('');//description
    const [frm_date,setFrom_date]=useState('')//from date
    const [emp_id, setEmp_id]=useState('') //emp id 
    useEffect(() => {   
      instance.get(`${process.env.REACT_APP_APPROVALIST}?type_of_leave=${_key}`).then( res =>{
        console.log('hi',_key,res.data.result); 
        if(res && res.data && res.data.result && res.data.result.length > 0){
            setList(res.data.result)
        }else{
            setList([])
        }          
      })
      instance.get(process.env.REACT_APP_APPROVAL_COUNT).then(res =>{
        setCount(res.data)
      })
      .catch((err)=> {
        console.log(err.message)
        })
    }, [_key]);

    const getCount=(typ)=>{
        let data=count.filter((data => data[typ])  ) 
        console.log(data)
        if(data && data.length > 0){
            return data[0][typ]
        }  else{
            return 0
        }
    }

    

    const onApproved =()=>{
        const appStatus={
            status: btn_status,
            type_of_leave: leavetype,
            status_description: status_des,
            leave_master_id: emp_id,
            from_date: frm_date,
        }       
        const approved = list.filter( item => item.from_date === frm_date && item.type_of_leave === leavetype)
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
        console.log(rejected,appStus)
        if(rejected){
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
  return (
    <Col className="px-3 py-3 mt-3 mb-3">     
        <Tabs
            defaultActiveKey="casual_leave"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            activeKey={_key} onSelect={ e => setKey(e)}
        >
            <Tab eventKey="casual_leave" title={`Casual ${getCount("casual_leave")}`}>
                <LeaveListTable  list={list} _key={_key}/>                
            </Tab>
            <Tab eventKey="sick_leave" title={`Sick ${getCount('sick_leave')}`}>
                <LeaveListTable  list={list} _key={_key}/> 
            </Tab>
            <Tab eventKey="work_from_home" title={`Work From Home ${getCount('work_from_home')}`}>
               
            </Tab>
            <Tab eventKey="permission" title={`Permission ${getCount('permission')}`}>
                <PerLeaveListTable  list={list} _key={_key}/>  
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