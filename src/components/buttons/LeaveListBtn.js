
import {useState} from 'react'
import  { Button, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import moment from 'moment';
import instance from '../../service/service';
import { toast } from 'react-toastify';


export const Approvebtn =({item})=>{
    const [show, setShow]=useState(false)
    const [btn_status, setBtn_status]=useState(0)
    
    
    const approv_btn =()=>{
        setShow(true)
        setBtn_status(1)
    }
    return(
        <div>
            <Button className="btn btn-success btn-sm m-1"
               onClick={approv_btn}
            >
                Approved
            </Button>
            <ApprovedModals  show={show} setShow={setShow} item={item} btn_status={btn_status}/>
        </div>
        
    )
}
export const Rejectbtn =({item})=>{
    const [show, setShow]=useState(false)
    const [btn_status, setBtn_status]=useState(0)
    
    
    const reject_btn =()=>{
        setShow(true)
        setBtn_status(2)
    }
    return(
        <>
            <Button className="btn btn-danger btn-sm m-1"
                onClick={reject_btn}>
                Rejected
            </Button>
            <RejectedModals  show={show} setShow={setShow} item={item} btn_status={btn_status}/>
        </>
        
    )
}
export const Viewbtn =({item})=>{
    const onClick = ()=>{
        console.log(item)
    }
    return(
        <Button className="btn btn-primay btn-sm m-1" onClick={onClick}>
            View
        </Button>
    )
}

const ApprovedModals =({show, setShow, btn_status,item})=>{
    
    const [desc,setDesc]=useState('')

    const [frm_date,setfrm_date]=useState(moment.utc(item.from_date).format('DD-MM-YYYY'))
    
    const onSubmit =()=>{
        
        const appStatus={
            status: btn_status,
            type_of_leave: item.type_of_leave,
            status_description: desc,
            leave_master_id: item.leave_master_id,
            from_date: moment.utc(item.from_date).format('YYYY-MM-DD'),
        }  
        
        instance.post(process.env.REACT_APP_APPROVALUPDATE,appStatus)
        .then( res =>{
            if(res.status === 200 ){
                toast.success('Successfully Approved',{       
                    position: toast.POSITION.BOTTOM_LEFT,
                }) 
                setDesc('')
                setfrm_date('')
                setShow(false);
                
            }
        })
        console.log(appStatus,item)
    }
    return(
        <Modal show={show} onHide={()=> setShow(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Status Description</Form.Label>
                    <Form.Control 
                        value={desc} onChange={ e => setDesc(e.target.value)} className="mb-3"/>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control value={frm_date} onChange={e => setfrm_date(e.target.value)} setDate className="mb-3" />
                    <div className=" p-1 m-2 ">
                        <Button value="Save" onClick={onSubmit} className="btn btn-primary rounded-4 w-auto">Save</Button>
                    </div>
                    
                </Form>                    
            </Modal.Body>
        </Modal>
    )
}

const RejectedModals =({show, setShow, btn_status,item})=>{
    
    const [desc,setDesc]=useState('')

    const [frm_date,setfrm_date]=useState(moment.utc(item.from_date).format('DD-MM-YYYY'))
    
    const onSubmit =()=>{        
        const appStatus={
            status: btn_status,
            type_of_leave: item.type_of_leave,
            status_description: desc,
            leave_master_id: item.leave_master_id,
            from_date: moment.utc(item.from_date).format('YYYY-MM-DD'),
        }          
        instance.post(process.env.REACT_APP_APPROVALUPDATE,appStatus)
        .then( res =>{
            if(res.status === 200 ){
                toast.success('Successfully Rejected',{       
                    position: toast.POSITION.BOTTOM_LEFT,
                }) 
                setDesc('');
                setfrm_date('');
                setShow(false);                
            }
        })
        .catch( err =>{
            toast.error(`${err.message}`,{       
                position: toast.POSITION.BOTTOM_LEFT,
            }) 
        })
    }
    return(
        <Modal show={show} onHide={()=> setShow(false)}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Status Description</Form.Label>
                    <Form.Control 
                        value={desc} onChange={ e => setDesc(e.target.value)} className="mb-3"/>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control value={frm_date} onChange={e => setfrm_date(e.target.value)} setDate className="mb-3" />
                    <div className=" p-1 m-2 ">
                        <Button value="Save" onClick={onSubmit} className="btn btn-primary rounded-4 w-auto">Save</Button>
                    </div>
                    
                </Form>                    
            </Modal.Body>
        </Modal>
    )
}

