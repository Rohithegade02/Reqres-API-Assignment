import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import React from 'react'

const Filter = ({
  showFilterOption,
  setShowFilterOption,
  filterByName,
}: {
  showFilterOption: boolean
  setShowFilterOption: (arg0: boolean) => void
  filterByName: () => void
  filterByNameDesc: () => void
}) => {
  return (
    <div>
      <button
        onClick={() => setShowFilterOption(!showFilterOption)}
        className='text-white  bg-black w-40 py-4 rounded-2xl'
      >
        Filter
        {showFilterOption ? (
          <ArrowDropUp className='text-white' />
        ) : (
          <ArrowDropDown className='text-white' />
        )}{' '}
      </button>
      {showFilterOption && (
        <div className='flex flex-col'>
          <button
            className='text-black text-[12px] bg-[#018777] hover:bg-white px-8 py-4 rounded-t-2xl'
            onClick={filterByName}
          >
            Sort by A to Z
          </button>
          <button className='text-black text-[12px] bg-[#018777] hover:bg-white px-8 py-4 rounded-b-2xl'>
            Sort by Z to A
          </button>
        </div>
      )}
    </div>
  )
}

export default Filter
