import React from 'react'
import { UserData } from '../types'
import {
  ArrowCircleLeftSharp,
  ArrowCircleRightSharp,
} from '@mui/icons-material'

interface PaginationProps {
  page: UserData['page']
  totalPages: UserData['total_pages']
  onPageChange: (newPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1)
    }
  }

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1)
    }
  }

  return (
    <div className='flex justify-center items-center gap-4 mt-4'>
      <button
        className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
        onClick={handlePrev}
        disabled={page === 1}
      >
        <ArrowCircleLeftSharp />
      </button>
      <span className='text-lg'>
        {page} of {totalPages}
      </span>
      <button
        className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
        onClick={handleNext}
        disabled={page === totalPages}
      >
        <ArrowCircleRightSharp />
      </button>
    </div>
  )
}

export default Pagination
