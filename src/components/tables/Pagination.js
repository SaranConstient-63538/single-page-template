
import {useState} from 'react'
import "./pagination.css";

export const Pagination =(props)=>{
  const {pageNumber, handleNextbtn, handlePrevbtn , maxPage, currentPage, minPage, curItem} = props;
  // console.log(props.currentPage)
  return(
    <ul className="page-number">
    <li>
      <button onClick={handlePrevbtn} disabled={currentPage > minPage ? 'disable' : 'visiable'}>Prev</button>
    </li>
    {pageNumber}
    <li>
      <button onClick={handleNextbtn} disabled={currentPage < minPage ? 'disable' : 'visiable'}>Next</button>
    </li>
  </ul>
    
  );
}




{/*

    <ul className="page-number border-0">
      <button className='border-0 rounded-pill py-0 my-auto text-dark' disabled={currentPage > minPage ?  'visible':'none'} onClick={handlePrevbtn}>
        <span><i class="bi bi-caret-left"></i></span>Prev
      </button>
      {pageNumber}
      <button className='border-0 rounded-pill py-0 my-auto text-dark' disabled={currentPage < maxPage ?  'visible':'none'} onClick={handleNextbtn}>
        Next<span><i class="bi bi-caret-right"></i></span>
      </button>
    </ul>
*/}