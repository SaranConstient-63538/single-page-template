import React,{useState} from 'react'
import { Table} from 'react-bootstrap'
import instance from '../../service/service'
import moment from 'moment'
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
    return(
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
                    list?.length ?
                        list.map((item,idx)=>{
                            if(item.type_of_leave === _key  ){
                                return(
                                    <tr key={idx}>
                                        <td>{idx+1}</td>
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
    )
}
export default LeaveListTable;