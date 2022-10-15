import React,{useState, useEffect} from 'react'
import { Col, Table, Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
import { Rejectbtn, Approvebtn } from '../buttons/LeaveListBtn'

const PerLeaveListTable =({list,_key})=>{
    const [show, setShow] = useState(false)
    console.log(list,_key)
    const leavelistCol = [
        {field:'id',header:'S.No'},
        {field:'updated_by',header:'Emp Name'},
        {field:'from_date',header:'Start Date'},
        {field:'frm_time',header:'Start Time'},
        {field:'end_time',header:'End Time'},
        {field:'no_of_hours',header:'Hours'},
        {field:'description',header:'Reason'},
        {field:'button',header:'Approval status'},
        {field:'action',header:'Action'},
    ]
    return(
        <Table className="table-responsive">
            <thead>
                <tr>
                    {leavelistCol.map((head)=>(
                        <th>{head.header}</th>
                    ))}
                </tr>
                {/* <tr>
                    <th>Emp Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Approval Status </th>
                    <th>Action</th>                            
                </tr> */}
            </thead>
            <tbody>     
                {/* {   list?.length ?

                    list.map( (row)=>(
                        <tr>
                            {leavelistCol.map( (col)=>(
                                <td>{row[col.field]}</td>
                            ))}
                            <td>
                                
                            </td>
                        </tr>
                    )):(                       
                        <tr><td colSpan='8'>No Record Founded</td></tr>                      
                    )
                }                   */}
                { list && list.length > 0 ?
                    list.map((item,idx)=>{
                        console.log(item.length,item.type_of_leave,_key)
                        if(item.type_of_leave === _key  ){
                            return(
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    <td>{item.updated_by} </td>
                                    <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                                    <td>{ moment.utc(item.from_date).format('hh : mm')}</td>
                                    <td>{ moment.utc(item.to_date).format('hh : mm')}</td>
                                    <td>{ item.type_of_leave === 'permission'? item.no_of_hours: item.no_of_days}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <>                                       
                                            <Approvebtn  item={item} _key={_key}/>
                                            <Rejectbtn item={item}/>                                               
                                        </>                                            
                                    </td>   
                                    <td>                                                
                                        
                                                <Button className='btn-sm m-1 '
                                                    onClick={()=>{
                                                        // setView(item)
                                                        // setSpec_show(true)                                                            
                                                    }}
                                                >
                                                    View
                                                </Button>                                                        
                                            
                                                                        
                                    </td>                                                                                     
                                </tr>
                                                    
                            ) 
                        }
                         }                   
                    ): (                       
                        <tr><td colSpan='3'>No Record Founded</td></tr>                      
                    )   
                }
            </tbody>
        </Table>
    )
}
export default PerLeaveListTable;