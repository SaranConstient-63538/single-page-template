
import {useState} from 'react'

import './pagination.css'
export const Pagination =(props)=>{
  const {pageNumber, handleNextbtn, handlePrevbtn} = props;
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

