
import {Form, Col,InputGroup} from 'react-bootstrap'
import * as Bi from 'react-icons/bi'
import './topbar.css'

const SearchBarTop =()=>{
    return(
        <div className=' px-4'>
            <Form className="d-flex align-items-center h-100">
                <span className="position-absolute searchbar"><Bi.BiSearch size={25}/></span>
                <Form.Control  className="position-relative search " 
                    placeholder="Search..."
                />
            </Form>
        </div>

    )
}
export default SearchBarTop;