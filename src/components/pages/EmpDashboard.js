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
import { UserLeaveList } from '../tables/UserLeaveList';

const EmpDashboard = () => {
    
    const [order,setOrder ]=useState('ASC')
    const [sick_leave, setSick_leave]=useState('')
    const [casual_leave, setCasual_leave]=useState('')
    const [work_from_home, setWork_from_home]=useState('')
    const [permission, setPermission]=useState('')
    const [data, setData]=useState([])
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
    
    useEffect(()=>{         

       

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
    },[])


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
            <div className='="text-center'>
                <Col className="px-3 mt-3 mb-3">
                    <h4 className='text-start text-capitalize m-0 fw-bold'>user leave list</h4>                
                </Col>
                <UserLeaveList />                
            </div>
        </motion.div>
            
    </motion.div>
  )
}

export default EmpDashboard