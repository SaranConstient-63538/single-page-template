import React,{useState, useEffect} from 'react'
import { Col,Tabs, Tab} from 'react-bootstrap'
import instance from '../../service/service'

import LeaveListTable from '../tables/LeaveListTable'
// import { toast } from 'react-toastify'

const LeaveListTab = () => {
    
    const [_key, setKey]=useState('casual_leave')
    const [list, setList]=useState([])
    
    // const [_show, _setShow]=useState(false)
    const [count, setCount]=useState([])

    
    useEffect(() => {   
        instance.get(`${process.env.REACT_APP_APPROVALIST}?type_of_leave=${_key}`).then( res =>{
            console.log('hi',_key,res.data.result); 
            if(res && res.data && res.data.result && res.data.result.length > 0){
                setList(res.data.result)
            }
        })
        .catch( err =>{
            console.log(err.message)
        })
         
        
    }, [_key]);

    useEffect(() => {          
        instance.get(process.env.REACT_APP_APPROVAL_COUNT).then(res =>{
          setCount(res.data)
        })
        .catch((err)=> {
          console.log(err.message)
          })
      }, []);

    const getCount=(typ)=>{
        let data=count.filter((data => data[typ])  ) 
        console.log(data)
        if(data && data.length > 0){
            return data[0][typ]
        }  else{
            return 0
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
                <LeaveListTable  list={list} _key={_key} setList={setList}/>                
            </Tab>
            <Tab eventKey="sick_leave" title={`Sick ${getCount('sick_leave')}`} >
                <LeaveListTable  list={list} _key={_key} setList={setList}/> 
            </Tab>
            <Tab eventKey="work_from_home" title={`Work From Home ${getCount('work_from_home')}`}>
                <LeaveListTable  list={list} _key={_key} setList={setList}/> 
            </Tab>
            <Tab eventKey="permission" title={`Permission ${getCount('permission')}`} >
                <LeaveListTable  list={list} _key={_key} setList={setList}/>  
            </Tab>        
        </Tabs>
        <>
            {/* <Modal show={spec_show} onHide={()=> setSpec_show(false)}>
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
            </Modal> */}
            
                        
        </>
    </Col>
  )
}

export default LeaveListTab