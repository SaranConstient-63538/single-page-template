import React,{useState} from 'react'
import { Table, Col} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { Pagination } from './Pagination'
import { Approvebtn, Rejectbtn, Viewbtn } from '../buttons/LeaveListBtn'
import { loading } from '../loading'
import { useForm } from 'react-hook-form'

const LeaveListTable =({list,_key})=>{
    const [show, setShow] = useState(false)
    console.log(list,_key)
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

    

    const [currentPage, setCurrentpage]=useState(1)
    const [perPage,setPerpage]=useState(3)

  const [pageLimit]=useState(3)
  const [maxPage, setMaxpage]=useState(3)
  const [minPage, setMinpage]=useState(0)
 
  
  const lastPage = currentPage * perPage;
  const firstPage = lastPage - perPage;
  const curData = list.slice(firstPage,lastPage);


//pagination
  const dataList = [];
  const dataLen = Math.ceil(list.length/perPage);
  for(var i=1; i<=dataLen;i++){
    dataList.push(i)
  }

  const handleClick =(event)=>{
    setCurrentpage(Number(event.target.id))
  }  
  const pageNumber = dataList.map( number =>{
    if(number < maxPage + 1 &&  number  > minPage ){
      return(
        <li key={number} id={number} className="border-0 rounded-pill my-auto px-3 py-2 bg-dark text-white" onClick={handleClick}>
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

    return(
        <>
            <Col>
                <Table className="table-responsive">
                    <thead>
                        <tr>
                            {leavelistCol.map((head)=>(
                                <th>{head.header}</th>
                            ))}
                        </tr>            
                    </thead>
                    <tbody>   
                        { 
                            curData?.length ?
                                curData.map((item,idx)=>{
                                    if(item.type_of_leave === _key  ){
                                        return(
                                            <tr key={idx}>
                                                <td>{(perPage *(currentPage-1))+idx+1}</td>
                                                <td>{item.updated_by} </td>
                                                <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                <td>{ moment.utc(item.to_date).format('DD-MM-YYYY')}</td>
                                                <td>{ item.no_of_days}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <>
                                                        <Approvebtn  item={item} _key={_key}/>
                                                        <Rejectbtn item={item} _key={_key}/>                                               
                                                    </>
                                                </td>   
                                                <td>                                                
                                                    <><Viewbtn item={item}/></>                                
                                                </td>                                                                                     
                                            </tr>
                                                                
                                        ) 
                                    }
                                    }                   
                                ): (                       
                                    <tr><td colSpan='8' className='text-center'>No Record Founded</td></tr>                      
                                )
                            
                        }
                    </tbody>
                </Table>
            </Col>
            <Col>
                <Pagination pageNumber={pageNumber} handlePrevbtn={handlePrevbtn} handleNextbtn={handleNextbtn}/>
            </Col>
        </>

    )
}
export default LeaveListTable;