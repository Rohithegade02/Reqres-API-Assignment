import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../types'
import { updateUserById } from '../api'
import EditIcon from '@mui/icons-material/Edit'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateUser } from '../slice/dataSlice'

interface EditModalProps {
  data: User
  userId: User['id']
  setShowEditModal: (arg0: boolean) => void
}

function EditModal({ data, userId, setShowEditModal }: EditModalProps) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    },
  })

  const submitForm = async (formData: User) => {
    try {
      if (
        data.first_name === formData.first_name &&
        data.last_name === formData.last_name &&
        data.email === formData.email
      ) {
        toast.error('No value changed to update the User')
        return
      }

      await updateUserById(userId, formData)
      dispatch(updateUser({ ...data, ...formData }))
      toast.success('Updated User Successfully')
      setTimeout(() => {
        setShowEditModal(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error updating user')
    }
  }

  return (
    <div className='flex flex-col items-center p-2 shadow-lg bg-white relative gap-5 w-[400px] rounded-lg h-[50%]'>
      <form
        onSubmit={handleSubmit(submitForm)}
        className='h-[50%] border-2 border-[#f1f1f1] pb-2 flex flex-col items-center z-10 rounded-lg w-96'
      >
        <div className='bg-[#f1f1f1] flex flex-col rounded-lg items-center justify-center h-48 w-96'>
          <div className='rounded-full bg-white w-24 h-24 flex items-center justify-center'>
            <img
              src={data.avatar}
              className='w-20 h-20 rounded-full object-cover'
              alt='User Avatar'
            />
          </div>
          <div>
            <p className='text-[#202022] font-bold'>
              {data.first_name} {data.last_name}
            </p>
          </div>
          <div>
            <p className='text-[#828282] font-medium'>{data.email}</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-4 w-full px-4'>
          <div className='flex items-center w-full justify-between'>
            <div>
              {' '}
              <label className='text-[#5b5b5d] font-semibold'>First Name</label>
            </div>
            <div>
              <input
                {...register('first_name', {
                  required: 'First name is required',
                })}
                className='border border-gray-300 p-2 rounded-md w-full'
              />
              {errors.first_name && (
                <p className='text-red-500'>{errors.first_name.message}</p>
              )}
            </div>
          </div>
          <div className='bg-[#f1f1f1] h-0.5 w-full ' />
          <div className='flex items-center w-full justify-between'>
            <div>
              {' '}
              <label className='text-[#5b5b5d] font-semibold'>Last Name</label>
            </div>{' '}
            <div>
              <input
                {...register('last_name', {
                  required: 'Last name is required',
                })}
                className='border border-gray-300 p-2 rounded-md w-full'
              />
              {errors.last_name && (
                <p className='text-red-500'>{errors.last_name.message}</p>
              )}
            </div>
          </div>
          <div className='bg-[#f1f1f1] h-0.5 w-full ' />

          <div className='flex items-center w-full justify-between'>
            <div>
              <label className='text-[#5b5b5d] font-semibold'>Email</label>
            </div>
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className='border border-gray-300 p-2 rounded-md w-full'
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className='bg-[#f1f1f1] h-0.5 w-full ' />

          <div className=' flex gap-4'>
            <button
              type='submit'
              className=' border-2 border-gray-300 text-[#6c6c6c] p-2 font-semibold rounded-md w-full'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-[#1f1f21] text-white p-2 font-semibold flex items-center justify-center gap-1 text-[14px] rounded-md w-full'
            >
              <EditIcon style={{ height: '16px', width: '16px' }} /> Save
              Changes
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  )
}

export default memo(EditModal)
