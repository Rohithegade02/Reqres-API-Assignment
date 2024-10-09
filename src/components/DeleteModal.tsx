import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { DeleteRounded } from '@mui/icons-material'
import { User } from '../types'
import { deleteUserById } from '../api'

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  userId,
}: {
  showDeleteModal: boolean
  setShowDeleteModal: (arg0: boolean) => void
  userId: User['id']
}) {
  const handleDeleteUser = async () => {
    await deleteUserById(userId)
    setShowDeleteModal(false)
  }
  return (
    <div className='flex flex-col items-center bg-white p-5 gap-5 w-96 rounded-lg relative'>
      <div>
        <p className=' font-semibold text-[#3a4e63]'>Delete User?</p>
      </div>
      <div>
        <p className=' font-semibold text-[#59687b]'>
          Are you sure want to delete User?
        </p>
      </div>
      <div
        className='absolute top-1 cursor-pointer  right-1'
        onClick={() => setShowDeleteModal(false)}
      >
        <ClearIcon className='w-10 h-10  text-gray-400' />
      </div>
      <div className='flex justify-between w-80 items-center'>
        <button className='text-white font-medium rounded-3xl  px-10 py-2   bg-[#627d98] '>
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className='text-black flex gap-2 items-center bg-[#e12d39] px-3 py-2 rounded-3xl font-medium'
        >
          <div>
            <p className='text-[#ffe2e3] text-base font-medium'> Delete User</p>
          </div>
          <DeleteRounded
            style={{
              width: '20px',
              height: '20px',
              color: '#ffe2e3 ',
              paddingBottom: '2px',
            }}
          />
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
