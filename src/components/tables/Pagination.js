
import {useState} from 'react'

import './pagination.css'
export const Pagination =(props)=>{
  const {pageNumber, handleNextbtn, handlePrevbtn} = props;
  return(
    <ul className="page-number border-0">
      <li className='border-0 rounded-pill py-0 my-auto text-dark' onClick={handlePrevbtn}>
        <span><i class="bi bi-caret-left"></i></span>Prev
      </li>
      {pageNumber}
      <li className='border-0 rounded-pill py-0 my-auto text-dark'  onClick={handleNextbtn}>
        Next<span><i class="bi bi-caret-right"></i></span>
      </li>
    </ul>
  );
}

