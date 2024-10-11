import React from 'react'

const Filter = ({
  filterByName,
  filterByNameDesc,
}: {
  filterByName: () => void
  filterByNameDesc: () => void
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value === 'asc') {
      filterByName()
    } else if (value === 'desc') {
      filterByNameDesc()
    }
  }

  return (
    <div className='flex items-center'>
      <select
        onChange={handleFilterChange}
        className='text-gray-500 border-gray-300 border-2  w-40 py-3 px-6 text-center rounded-2xl focus:outline-none appearance-none'
      >
        <option value='' disabled selected>
          Filter
        </option>
        <option
          value='asc'
          className='text-black bg-[#018777] focus:bg-[#018777] text-center hover:bg-white'
          style={{
            backgroundColor: 'white',
            padding: '10px ',
            textAlign: 'center',
          }}
        >
          Sort by A to Z
        </option>
        <option
          value='desc'
          className='text-black bg-[#018777]  text-center hover:bg-white'
          style={{
            backgroundColor: 'white',
            padding: '10px ',
            textAlign: 'center',
          }}
        >
          Sort by Z to A
        </option>
      </select>
    </div>
  )
}

export default Filter
