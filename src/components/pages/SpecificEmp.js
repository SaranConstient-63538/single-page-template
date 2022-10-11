
import { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const SpecificEmp =({mst_id, leave, item })=>{
    const [show,setShow]=useState(false)
    const [list, setList] =useState([])
    console.log(mst_id, leave, item );

    useEffect(()=>{
        
           //   instance.post(process.env.REACT_APP_SPECIFIC_LEAVELIST).then(res =>{
    //     console.log(res.data);
    //     setSpecific_list(res.data)
    //   })
    },[])
    return(
        <>
            <Button onClick={()=> {
                setShow(true)
                setList(item)
                console.log(typeof list)
            }}>View Status</Button>
           <Modal show={show} onHide={()=> setShow(false)}>
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
                           
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>
        </>

    )
}
export default SpecificEmp;