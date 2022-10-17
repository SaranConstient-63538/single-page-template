
import {useState} from 'react'


export const Pagination =({data})=>{
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)

    console.log('pagination',data)
}