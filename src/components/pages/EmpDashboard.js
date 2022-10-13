import React, {useState, useEffect} from 'react';
import { Row, Col,Card, Table } from 'react-bootstrap';
import Permissionslider    from './Permissionslider';
import './leave.css'
import WorkFromHome from './WorkFromHome';
import CasualLeavel from './CasualLeave';
import SickLeave from './SickLeave';
import instance from '../../service/service';
import { motion } from 'framer-motion';
import moment  from 'moment'
import * as Ai from  'react-icons/ai'
import Pagination from './Pagination'

const EmpDashboard = () => {
    let user_list;
    const [order,setOrder ]=useState('ASC')
    const [sick_leave, setSick_leave]=useState('')
    const [casual_leave, setCasual_leave]=useState('')
    const [work_from_home, setWork_from_home]=useState('')
    const [permission, setPermission]=useState('')
    const [userList, setUserList]=useState([])
    //pagination
    const [perPage, setPerpage]=useState(6)
    // const [currentPage, setCurrentPage]=useState(1)
    // const [pageLimit]=useState(5)
    // const [minPage, setMinpage]=useState(0)
    // const [maxPage, setMaxpage]=useState(5)

    // const lastPage = currentPage * perPage;
    // const firstPage = lastPage - perPage;
  
    // const curItem = user_list.slice(firstPage,lastPage)
    
    const items = JSON.parse(localStorage.getItem('data'))
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
    useEffect(()=>{           

        instance.get(process.env.REACT_APP_USERS_LEAVELIST).then(res => {
            // console.log(res.data)
            user_list = res.data
            // console.log('api',user_list)
            user_list.sort((a,b)=> a.from_date.localeCompare(b.from_date))
            setUserList(user_list)
        }) 

        instance.post(process.env.REACT_APP_LEAVELIST).then(res =>{
            // console.log( res.data,'emp');
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
    },[user_list])
    
    const listData =[];
    const listLen = Math.ceil( userList.length/perPage)
    for ( var i=0; i<=listLen; i++ ){
        listData.push(i)
    }
    // console.log(listData,userList.length)

  return (
    <motion.div initial={{opacity: 1}} animate={{y:0}}>
            <Col className="px-3 my-3">
                <motion.h4 animate={{  x:[100,0], opacity:1}} transition={{duration:3}}  className='text-start pt-5 mt-5 m-0 fw-bold text-capitalize'>welcome {items.username}</motion.h4>                
            </Col>
           <Col >
                <Row className="justify-content-around px-5 py-5"> 
                    <motion.div animate={{y:[100,0]}} transition={{duration:3.5}} className="col-sm col-md">
                        {/* <Col sm md > */}
                            <Permissionslider  />                                           
                        {/* </Col> */}
                    </motion.div>
                    <motion.div animate={{y:[100,0]}} transition={{duration:4}} className="col-md col-sm">
                        {/* <Col sm md> */}
                            <SickLeave sick_leave = {sick_leave} />
                        {/* </Col> */}
                    </motion.div>
                    
                    <motion.div animate={{y:[100,0]}} transition={{duration:4.5}} className="col-md col-sm">
                        <CasualLeavel  casual_leave={casual_leave}/>
                    </motion.div>
                    <motion.div animate={{y:[100,0]}} transition={{duration:5}} className="col-md col-sm">
                        <WorkFromHome work_from_home={work_from_home}/>                  
                    </motion.div>
                </Row>                
           </Col>
    
        <motion.div animate={{y:[100,0]}} transition={{duration:5}}>
            <div className="text-center">
                <Col className="px-3 mt-3 mb-3">
                    <h4 className='text-start text-capitalize m-0 fw-bold'>user leave list</h4>                
                </Col>
                <Col className="px-3 py-3 mt-3 mb-3">
                    <Table hover className='table-borderless'>
                        <thead>
                            <tr>                          
                                <th className='py-3 text-capitalize'>S.No</th>
                                <th className='py-3 text-capitalize' onClick={()=> onSorting('from_date')}>
                                    From Date  <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                </th>
                                <th className='py-3 text-capitalize' onClick={()=> onSorting('to_date')}>
                                    To Date <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                </th>
                                <th className='py-3 text-capitalize' onClick={()=> onSorting('leave_type')}>                                
                                    Leave Type <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                </th>
                                <th className='py-3 text-capitalize' onClick={()=> onSorting('leave_reason')}>
                                    Leave Reason <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                </th>
                                <th className='py-3 text-capitalize' onClick={()=> onSorting('approve')}>
                                    Approval Status <Ai.AiOutlineArrowDown /> <Ai.AiOutlineArrowUp />
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            { userList?.length ?
                                userList.map((item,idx)=>{
                                    return(
                                        <tr key={idx} className="shadow rounded-pill">
                                            <td className="py-3">{idx +  1}</td>
                                            <td className="py-3">{moment().utc(item.from_date).format('DD-MM-YYYY')}</td>
                                            <td className="py-3">{moment().utc(item.to_date).format('DD-MM-YYYY')}</td>
                                            <td className="py-3">{item.type_of_leave === 'sick_leave'? 'Sick Leave': item.type_of_leave === 'casual_leave' ? 'Casual Leave':item.type_of_leave === 'work_from_home' ? 'Work From Home':item.type_of_leave === 'permission' ? 'Permission' : ''  }</td>                                      
                                            <td className="py-3">{item.description}</td>
                                            <td className="py-3">
                                                {item.status === 0 ?(
                                                    <p className='m-0 text-capitalize' >waiting for approval</p>
                                                ):(
                                                    <p className='m-0 text-capitalize'>approved</p>
                                                )
                                            } 
                                            </td>
                                        </tr>
                                    )
                                }):(
                                    <tr><td colSpan='3'>No Record Founded</td></tr>
                                )
                            }
                        </tbody>   
                    </Table>
                    <>
                        <Pagination />
                    </>
                </Col>
            </div>   
        </motion.div>    
    </motion.div>
  )
}

export default EmpDashboard