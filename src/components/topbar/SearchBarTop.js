
import {Form, Col,InputGroup} from 'react-bootstrap'
import * as Bi from 'react-icons/bi'
import './topbar.css'

const SearchBarTop =()=>{
    return(
        <div className='ms-auto px-4'>
            <Form className="d-flex align-items-center h-100">
                {/* <span className="position-absolute searchbar"><Bi.BiSearch size={25}/></span> */}
                <Form.Control  className="position-relative fw-bold text-black shadow border-0 rounded-pill text-center" 
                    placeholder="Search..." type='search'
                />
            </Form>
        </div>

    )
}
export default SearchBarTop;