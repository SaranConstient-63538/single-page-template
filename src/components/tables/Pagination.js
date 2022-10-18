
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


  