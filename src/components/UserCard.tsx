import React, { memo, useCallback, useState } from 'react'
import { User } from '../types'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
interface UserCardProps {
  data: User
  userId: User['id']
}

const UserCard: React.FC<UserCardProps> = ({ data, userId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)

  const handleEditModal = useCallback(() => {
    setShowEditModal(!showEditModal)
  }, [])

  const handleDeleteModal = useCallback(() => {
    setShowDeleteModal(!showDeleteModal)
  }, [])

  return (
    <div className='flex p-3 rounded-3xl shadow-lg bg-black  gap-4'>
      <div className='flex bg-black items-center'>
        <img
          src={data.avatar}
          alt={`${data.first_name} ${data.last_name}`}
          className='w-60 h-60 z-10  rounded-3xl'
        />
      </div>
      <div className='flex flex-col bg-black justify-between'>
        <div
          className='flex justify-end bg-black items-end cursor-pointer'
          onClick={handleDeleteModal}
        >
          <div className='h-10 w-10 shadow-lg bg-[#fc534d] rounded-full flex items-center justify-center '>
            <ClearIcon className='w-8 h-8 bg-[#fc534d] text-white' />
          </div>
        </div>
        {showDeleteModal && (
          <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div
              className='absolute inset-0 bg-black opacity-50'
              onClick={() => setShowDeleteModal(false)}
            ></div>
            <div className='relative shadow-lg z-20'>
              <DeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                userId={userId}
              />
            </div>
          </div>
        )}
        {showEditModal && (
          <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div
              className='absolute inset-0 bg-black opacity-50'
              onClick={() => setShowEditModal(false)}
            ></div>
            <div className='relative shadow-lg z-20'>
              <EditModal
                data={data}
                userId={userId}
                setShowEditModal={setShowEditModal}
              />
            </div>
          </div>
        )}
        <div className='flex flex-col bg-black self-center'>
          <p className='text-2xl text-white font-bold bg-black'>
            {data.first_name}
          </p>
          <p className='text-2xl text-white font-bold bg-black'>
            {data.last_name}
          </p>
        </div>
        <div className='flex justify-end bg-black items-end cursor-pointer'>
          <div
            className='h-10 w-10 shadow-lg bg-[#018777] rounded-full flex items-center justify-center '
            onClick={handleEditModal}
          >
            <EditIcon className='w-8 h-8 bg-[#018777] text-white' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(UserCard)
