import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import { Col, Table } from 'react-bootstrap'
import instance from '../../service/service'
import {Pagination} from './Pagination'
import moment from 'moment'

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
    const onSorting =(col)=>{
        console.log(col,order,'sorting')
    }

    const [currentPage, setCurrentpage]=useState(1)
  const [perPage,setPerpage]=useState(8)

  const [pageLimit]=useState(5)
  const [maxPage, setMaxpage]=useState(5)
  const [minPage, setMinpage]=useState(0)
 
  
  const lastPage = currentPage * perPage;
  const firstPage = lastPage - perPage;
  const currentItem = data.slice(firstPage,lastPage);


//pagination
  const univerData = [];
  const univerLen = Math.ceil(data.length/perPage);
  for(var i=1; i<=univerLen;i++){
    univerData.push(i)
  }

  const handleClick =(event)=>{
    setCurrentpage(Number(event.target.id))
  }  

  const pageNumber = univerData.map( number =>{
    if(number < maxPage + 1 &&  number  > minPage ){
      return(
        <li key={number} id={number} className={currentPage == number ? "active page-item": null} onClick={handleClick}>
          {number}
        </li>
      )
    }else{
      return null;
    }
  })
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

    useEffect(()=>{
        instance.get(process.env.REACT_APP_USERS_LEAVELIST)
        .then( res =>{
            console.log(res)
            if(res.status === 200){
                setData(res.data);
            }
        })
        .catch( err =>{
            console.log(err.message);
        })
    },[])


    return(
        <motion.div animate={{y:[100,0]}} transition={{duration:5}}>
            <div className='="text-center'>
                <Col className="px-3 mt-3 mb-3">
                    <h4 className='text-start text-capitalize m-0 fw-bold'>user leave list</h4>                
                </Col>
                <Col className="px-3 py-3 mt-3 mb-3">
                    <Table  className='table-borderless'>
                        <thead>
                            <tr>
                                {userListCol.map((head) =>(
                                    <th className='py-3 text-capitalize'>
                                        {onSorting(head.header)}
                                    </th>
                                ))}                                                           
                            </tr>
                        </thead>
                        <tbody>
                            {data?.length && data.map( (row)=>(
                                <tr>
                                    {userListCol.map((col) =>(
                                        <td>{row[col.field]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
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
                                    <tr><td colSpan='8'>No Record Founded</td></tr>
                                )
                                }                      
                        </tbody>   
                    </Table>
                </Col>
                <Col>
                    <Pagination data={data} pageNumber={pageNumber} handlePrevbtn={handlePrevbtn} handleNextbtn={handleNextbtn}/>
                </Col>
            </div>
        </motion.div>
    )
}