import React, { forwardRef, memo } from 'react'

const SearchBar = forwardRef<
  HTMLInputElement,
  {
    inputData: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSearchClick: () => void
  }
>(({ inputData, handleChange, handleSearchClick }, ref) => {
  return (
    <div className='relative flex'>
      <input
        type='text'
        value={inputData}
        ref={ref}
        onChange={handleChange} // This handles typing input
        placeholder='Search By Name'
        className='w-60 h-12 px-2 rounded-2xl border-none bg-none focus:outline-none selection:border-none'
      />
      <button
        className='absolute top-0 px-5 left-56 rounded-r-2xl bg-[#018777] h-12 text-white'
        onClick={handleSearchClick} // Optional: If user wants to click search
      >
        Search
      </button>
    </div>
  )
})

export default memo(SearchBar)
