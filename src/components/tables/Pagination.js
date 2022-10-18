
<<<<<<< HEAD
import './pagination.css'

export const Pagination =({pageNumber, handleNextbtn, handlePrevbtn})=>{
    return(
      <ul className="page-number">
        <li>
          <button onClick={handlePrevbtn}>Prev</button>
        </li>
        {pageNumber}
        <li>
          <button onClick={handleNextbtn}>Next</button>
        </li>
      </ul>
    );
}


  
=======
import {useState} from 'react'


export const Pagination =({data})=>{
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)

    console.log('pagination',data)
}
>>>>>>> 34bedcf131a8b03a07e2eae487186b810627a82e
