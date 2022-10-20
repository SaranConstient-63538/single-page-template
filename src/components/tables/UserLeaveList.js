import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import { Col, Modal, Table } from 'react-bootstrap'
import instance from '../../service/service'
import {Pagination} from './Pagination'
import moment from 'moment'
import * as Ai from  'react-icons/ai'
import "./pagination.css";

export const UserLeaveList =()=>{
   
    const userListCol = [
        {field:'id',header:'S.No'},
        {field:'from_date',header:'Start Date'},
        {field:'to_date', header:'End Date'},
        {field:'type_of_leave',header:'Leave Type'},
        {field:'description',header:'Desc'},
        {field:'status',header:'App Status'}
    ]
    const [order,setOrder]=useState('ASC');
    const [data, setData]=useState([])
    const [desc_show, setDesc_show]=useState(false)
   

    const [currentPage, setCurrentpage]=useState(1)
    const [perPage,setPerpage]=useState(10)

  const [pageLimit]=useState(50)
  const [maxPage, setMaxpage]=useState(50)
  const [minPage, setMinpage]=useState(0)
 
  
  const lastPage = currentPage * perPage;
  const firstPage = lastPage - perPage;
  const curItem = data.slice(firstPage,lastPage);
  const handleClose = () => setDesc_show(false);
  const handleShow = () => setDesc_show(true);

//pagination
  const dataList = [];
  const dataLen = Math.ceil(data.length/perPage);
  for(var i=1; i<=dataLen;i++){
    dataList.push(i)
  }

  const handleClick =(event)=>{
    setCurrentpage(Number(event.target.id))
  }  
  const pageNumber = dataList.map( number =>{
    if(number < maxPage + 1 &&  number  > minPage ){
      return(
        <li key={number} id={number} className="border-0 rounded-pill my-auto px-3 py-2 text-dark page-number" onClick={handleClick}>
          {number}
        </li>
      )
    }else{
      return null;
    }
  })
  console.log(currentPage, 'current page',maxPage,'max page', minPage, 'min page')
  //previous pagination onclick function
  const handleNextbtn =()=>{
    setCurrentpage(currentPage + 1)
    if(currentPage+1>maxPage){
      setMaxpage(maxPage + pageLimit);
      setMinpage(minPage + pageLimit)
    }
  }
  //Next pagination onclick function
  const handlePrevbtn=()=>{
    setCurrentpage(currentPage - 1)
    if((currentPage-1)%pageLimit === 0){
      setMaxpage(maxPage - pageLimit);
      setMinpage(minPage - pageLimit)
    }
  }
    const onSorting = (col)=>{ 
        if(order === 'ASC'){
            const sorted = [...curItem].sort((a,b)=>
                a[col]>b[col] ? 1 :-1              
            )
            setData(sorted)
            setOrder('DSC')
        }
        if(order === 'DSC'){
            const sorted = [...curItem].sort((a,b)=>
                a[col]>b[col]? 1 : -1
            )
            setData(sorted)
            setOrder('ASC')
        }
    }
    
    useEffect(()=>{
        instance.get(process.env.REACT_APP_USERS_LEAVELIST)
            .then(res => {   
            setData(res.data)
            console.log(res.data)
        }) 
        .catch( err =>{
            console.log(err.message);
        })       
    },[])
    console.log(curItem)
    const handleDesc =(desc)=>{
        setDesc_show(true)
        console.log(desc,desc_show)
        return(

            <Modal show={desc_show} onClose={()=>setDesc_show(false)} size="md" centered>
                <Modal.Header closeButton>
                    Description             
                </Modal.Header>
                <Modal.Body>      
                    <p>{desc} </p>    
                </Modal.Body>
            </Modal>
        )  
        
    }
    return(
        <>
            <Col className="px-3 py-3">
                    <Table  className='table-borderless bg-white rounded-5 text-center'>
                        <thead>
                            <tr>
                                {userListCol.map((head) =>(                                    
                                    <th className='py-3 text-capitalize' key={head.field} onClick={() => onSorting(head.header)}>{/*onClick={onSorting(head.header)} */}
                                        {head.header}{<span><Ai.AiOutlineArrowUp /> <Ai.AiOutlineArrowDown /></span>}
                                    </th>
                                ))}                                                           
                            </tr>
                        </thead>                      
                        <tbody className="overflow-auto">
                            { curItem?.length ?

                                curItem.map((item,idx)=>{
                                    console.log(moment.utc(item.from_date).format('DD-MM-YYYY'))
                                    return(
                                        <tr key={idx} className="shadow rounded-pill">
                                            <td className="py-3">{(perPage *(currentPage-1))+idx +  1}</td>
                                            <td className="py-3">{moment().utc(item.from_date).format('DD-MM-YYYY')}</td>
                                            <td className="py-3">{moment().utc(item.to_date).format('DD-MM-YYYY')}</td>
                                            <td className="py-3">{item.type_of_leave === 'sick_leave'? 'Sick Leave': item.type_of_leave === 'casual_leave' ? 'Casual Leave':item.type_of_leave === 'work_from_home' ? 'Work From Home':item.type_of_leave === 'permission' ? 'Permission' : ''  }</td>                                      
                                            <td className="py-3" >{item.description.length > 10 ? (<a onClick={handleDesc}>...desc</a>):item.description}</td>
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
                                    <tr><td colSpan='8'>No Record Founded</td></tr>
                                )
                                }                      
                        </tbody>   
                    </Table>
                </Col>
                <Col>
                    {curItem.length > 0 ? 
                        <Pagination 
                            curItem={curItem} 
                            currentPage={currentPage} 
                            minPage={minPage} 
                            maxPage={maxPage} 
                            pageNumber={pageNumber} 
                            handlePrevbtn={handlePrevbtn} 
                            handleNextbtn={handleNextbtn}
                        />: ''}
                </Col>
        </>
    )
}