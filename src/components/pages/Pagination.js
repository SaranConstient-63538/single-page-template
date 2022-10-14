
import { Nav, Button } from 'react-bootstrap'

const Pagination =(props)=>{
    return(
        <Nav as="ul">
           <Nav.Item as="li">
                <Button className="btn btn-secondary btn-sm"> Prev </Button>
           </Nav.Item>
           <>{1}</>
           <Nav.Item as="li">
                <Button className="btn btn-secondary btn-sm"> Next </Button>
           </Nav.Item>
        </Nav>
    )
}
export default Pagination;