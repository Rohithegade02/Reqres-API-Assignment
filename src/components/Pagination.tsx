import React, { memo } from 'react'
import { UserData } from '../types'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
    <div className='flex justify-center pb-4 items-center gap-4 '>
      <button
        className='pl-4 pr-3 rounded-md py-2 border border-gray-600  flex items-center disabled:opacity-50'
        onClick={handlePrev}
        disabled={page === 1}
      >
        <ArrowBackIosIcon style={{ color: '#6b7280' }} />
      </button>
      <span className='text-lg'>
        {page} of {totalPages}
      </span>
      <button
        className='pl-3 pr-4 rounded-md py-2 border border-gray-600  flex items-center disabled:opacity-50'
        onClick={handleNext}
        disabled={page === totalPages}
      >
        <ArrowForwardIosIcon style={{ color: '#6b7280' }} />
      </button>
    </div>
  )
}

export default memo(Pagination)
