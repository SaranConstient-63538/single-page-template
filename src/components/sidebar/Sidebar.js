
import React from 'react'
import { Nav } from 'react-bootstrap'
import * as Ri from 'react-icons/ri'
import * as Fi from 'react-icons/fi'

import './sidebar.css'

const Sidebar = ({show}) => {
  return (    
    <>
    {
      show ? (
        <div className= 'sidebar shadow-lg'>
          <Nav as="ul" className='overflow-hidden flex-nowrap flex-column' variant='pills'>
            <Nav.Item className="text-center align-items-center p-3">
              <Nav.Link href="/home" className='text-secondary fs-5 flex-column'>
                <Ri.RiDashboardLine  className=' w-auto px-4 py-1 my-1' size={28}/>Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="text-center align-items-center p-3">
              <Nav.Link  href="/profile" className='text-secondary fs-5 flex-column'>
                <Fi.FiUser   className='w-auto px-5 py-1 my-1' size={28} />Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>   
        </div> 
      ): ''
    }
    </>    
  )
}
export default Sidebar