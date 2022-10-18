
import {useState} from 'react'

import './pagination.css'
export const Pagination =(props)=>{
  const {pageNumber, handleNextbtn, handlePrevbtn , maxPage, currentPage, minPage, curItem} = props;
  // console.log(props.currentPage)
  return(
   
        <ul className="page-number">
          <li >
            <button disabled={currentPage > minPage ? 'none' : 'visible'} onClick={handlePrevbtn}>Prev</button>
          </li>
          {pageNumber}
          <li>
            <button disabled={currentPage < maxPage ?  'visible':'none'}onClick={handleNextbtn}>Next</button>
          </li>
        </ul>
      );
}

