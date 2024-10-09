import { useNavigate } from 'react-router-dom'
import { LoginAPI } from '../../api'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../schema'
import { useForm } from 'react-hook-form'
import React from 'react'

//import { compareSync } from 'bcryptjs'
const Login = () => {
  // const token = useSelector(state => state?.user?.user?.token) //subscribe to store token
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async data => {
    console.log(data)
    const res = await LoginAPI(data)
    if (res.token) {
      // dispatch(login({ token, user }))
      navigate('/users')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} className='border border-black' />
        <p>{errors.email?.message}</p>

        <input {...register('password')} className='border border-black' />
        <p>{errors.password?.message}</p>

        <input type='submit' />
      </form>
    </div>
  )
}

export default Login
