import React, { memo } from 'react'
import { User } from '../types'

interface UserCardProps {
  data: User
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='rounded-lg border border-black'>
        <img
          src={data.avatar}
          alt={`${data.first_name} ${data.last_name}`}
          className='w-96 h-60 object-contain rounded-lg'
        />
      </div>
      <div>
        <p className='text-base font-semibold'>
          {data.first_name} {data.last_name}
        </p>
      </div>
    </div>
  )
}

export default memo(UserCard)
