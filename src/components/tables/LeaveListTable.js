import {Table} from 'react-bootstrap'

const LeaveListTable =({})=>{
    return(
        <Table className="table-responsive">
            <thead>
                {/* <tr>
                    {leavelistCol.map((head)=>(
                        <th>{head.header}</th>
                    ))}
                </tr> */}
                <tr>
                    <th>Emp Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Approval Status </th>
                    <th>Action</th>                            
                </tr>
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
                { list?.length ?
                    list.map((item)=>(
                        <tr key={item}>
                            <td>{item.updated_by} </td>
                            <td>{moment.utc(item.from_date).format('DD-MM-YYYY')}</td>
                            <td>{moment.utc(item.to_date).format('DD-MM-YYYY')}</td>
                            <td>{item.no_of_days}</td>
                            <td>{item.description}</td>
                            <td>
                                <>
                                    <Button className="btn-success btn btn-success btn-sm m-1" onClick={
                                        ()=>{
                                            setShow(true)  
                                            setId(idx) 
                                            setBtn_status(1)
                                            setEmp_id(item.leave_master_id)
                                            console.log(item.type_of_leave)
                                            setLeavetype(item.type_of_leave) 
                                            setFrom_date(moment.utc(item.from_date).format('YYYY-MM-DD'))
                                        }
                                    }>Approved</Button>
                                    <Button className="btn-danger btn btn-danger btn-sm m-1" onClick={
                                        ()=>{
                                            
                                            setId(idx)   
                                        
                                            _setShow(true)                                                                
                                            setBtn_status(2)
                                            setEmp_id(item.leave_master_id)
                                            setLeavetype(item.type_of_leave)  
                                            setFrom_date(moment.utc(item.from_date).format('YYYY-MM-DD'))                                                              
                                        }
                                    }>Rejected</Button>
                                </>
                            </td>   
                            <td>                                                
                                {item.type_of_leave === _key  && item.leave_master_id !== null  ? (
                                        <Button
                                            onClick={()=>{
                                                setView(item)
                                                setSpec_show(true)                                                            
                                            }}
                                        >
                                            View
                                        </Button>                                                        
                                    ):''
                                }                                    
                            </td>                                                                                    
                        </tr>
                                             
                    )                     
                ): (                       
                    <tr><td colSpan='3'>No Record Founded</td></tr>                      
                )   
            }
            </tbody>
        </Table>
    )
}
export default LeaveListTable;