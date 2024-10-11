import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../schema'
import { LoginAPI } from '../../api'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { AppDispatch } from '../../store'
import { login } from '../../slice/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async data => {
    const res = await LoginAPI(data)
    dispatch(login(data))
    if (res.token === 'QpwL5tke4Pnpja7X4') {
      toast.success('Login User Successfully')
      setTimeout(() => {
        navigate('/users')
      }, 2000)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen '>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded flex flex-col p-4 gap-4'
        >
          <h2 className='text-2xl font-bold text-[#018777] self-center mb-6'>
            Login
          </h2>
          <div className='mb-4'>
            <input
              {...register('email')}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Email'
            />
            {errors.email && (
              <p className='text-red-500 text-xs italic'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='mb-6'>
            <input
              {...register('password')}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              placeholder='Password'
            />
            {errors.password && (
              <p className='text-red-500 text-xs italic'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center justify-between'>
            <button
              className='bg-[#018777] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Login
