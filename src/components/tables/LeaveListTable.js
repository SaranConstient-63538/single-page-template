import React,{useState} from 'react'
import { Table, Col} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { Pagination } from './Pagination'
import { Approvebtn, Rejectbtn, Viewbtn } from '../buttons/LeaveListBtn'
import { loading } from '../loading'
import * as Ai from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import './pagination.css'

const LeaveListTable =({list,_key,setList})=>{
    const [show, setShow] = useState(false)
    const [order, setOrder]=useState('ASC')
    console.log(list,_key)
    const leavelistCol =[
        {field:'id',header:'S.No'},
        {field:'updated_by',header:'Emp Name'},
        {field:'from_date',header:'From'},
        {field:'to_date',header:'To'},
        {field:'no_of_days',header:'Days'},
        {field:'description',header:'Reason'},
        {field:'button',header:'status'},
        // {field:'action',header:'Action'},
    ]
    const perleavelistCol =[
        {field:'id',header:'S.No'},
        {field:'updated_by',header:'Emp Name'},
        {field:'from_date',header:'Date'},
        {field:'frm_time',header:'Time'},
        {field:'no_of_hours',header:'Hours'},
        {field:'description',header:'Reason'},
        {field:'button',header:'Status'},
        // {field:'action',header:'Action'},
    ]
  
    console.log(_key)
    

    const [currentPage, setCurrentpage]=useState(1)
    const [perPage,setPerpage]=useState(3)

  const [pageLimit]=useState(3)
  const [maxPage, setMaxpage]=useState(3)
  const [minPage, setMinpage]=useState(0)
 
  
  const lastPage = currentPage * perPage;
  const firstPage = lastPage - perPage;
  const curItem = list.slice(firstPage,lastPage);



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
  const onSorting =(col)=>{
    if(order === 'ASC'){
        const sorted = [...curItem].sort((a,b)=>
            a[col]>b[col] ? 1 :-1              
        )
        setList(sorted)
        setOrder('DSC')
    }
    if(order === 'DSC'){
        const sorted = [...curItem].sort((a,b)=>
            a[col]>b[col]? 1 : -1
        )
        setList(sorted)
        setOrder('ASC')
    }
}

    return(
        <>
            <Col>
                <Table className="table-responsive">
                    <thead>
                        <tr>

                            { list.type_of_leave !== 'permission' ? 
                              leavelistCol.map((head)=>(
                                <th key={head.field} onClick={() => onSorting(head.header)}>
                                  {head.header}{<span><Ai.AiOutlineArrowUp /> <Ai.AiOutlineArrowDown /></span>}
                                </th>
                              ))
                              :perleavelistCol.map((head)=>(
                                <th key={head.field} onClick={() => onSorting(head.header)}>
                                  {head.header}{<span><Ai.AiOutlineArrowUp /> <Ai.AiOutlineArrowDown /></span>}
                                </th>
                              ))                             
                            }
                        </tr>            
                    </thead>
                    <tbody>   
                        { 
                            curItem.length > 0 ?
                              curItem.type_of_leave !== "permission" ?
                                curItem.map((item,idx)=>{
                                    if(item.type_of_leave === _key  ){
                                        return(
                                            <tr key={idx}>
                                                <td>{(perPage *(currentPage-1))+idx+1}</td>
                                                <td>{item.updated_by} </td>
                                                <td>{moment().utc(item.from_date).format('DD-MM-YYYY')}</td>
                                                <td>{moment().utc(item.to_date).format('DD-MM-YYYY')}</td>
                                                <td>{ item.no_of_days}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <div className='d-flex flex-row'>
                                                        <Approvebtn  item={item} _key={_key}/>
                                                        <Rejectbtn item={item} _key={_key}/>                                               
                                                    </div>
                                                </td>   
                                                {/* <td>                                                
                                                    <><Viewbtn item={item}/></>                                
                                                </td>                                                                                      */}
                                            </tr>
                                                                
                                        ) 
                                    }}                   
                                ):
                                curItem.map((item,idx)=>{
                                  console.log(item.length,item.type_of_leave,_key)
                                  if(item.type_of_leave === _key  ){
                                      return(
                                          <tr key={idx}>
                                              <td>{idx + 1}</td>
                                              <td>{item.updated_by} </td>
                                              <td>{moment(item.from_date).format('DD-MM-YYYY')}</td>
                                              <td>{ moment(item.from_date).format('hh : mm')}</td>
                                              <td>{ moment(item.to_date).format('hh : mm')}</td>
                                              <td>{ item.type_of_leave === 'permission' ? item.no_of_hours : item.no_of_days}</td>
                                              <td>{item.description}</td>
                                              <td>
                                                  <>                                       
                                                      <Approvebtn  item={item} _key={_key}/>
                                                      <Rejectbtn item={item}/>                                               
                                                  </>                                            
                                              </td>   
                                              {/* <td>                                                
                                                  
                                                <><Viewbtn item={item}/></>                                                        
                                                                                  
                                              </td>                                                                                      */}
                                          </tr>
                                                              
                                      ) 
                                  }
                                   }                   
                              )                                
                                :(                       
                                    <tr><td colSpan='8' className='text-center'>
                                      No Record Founded</td></tr>                      
                                )
                            
                        }
                    </tbody>
                </Table>
            </Col>
            {/* <Col>
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
            </Col> */}
        </>

    )
}
export default LeaveListTable;