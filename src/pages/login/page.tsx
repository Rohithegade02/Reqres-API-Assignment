import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
    } else {
      // Here you would typically handle the login logic
      console.log('Login attempt', { email, password })
      setError('')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl font-bold text-blue-500 mb-6'>Login</h2>
          <div className='mb-4'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}
          <div className='flex flex-col items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Login
            </button>
            {/* <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4'
              href='#'
            >
              Don't have an account? Signup
            </a>
            <button
              className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full mt-4'
              type='button'
              onClick={() => console.log('Google login clicked')}
            >
              Login with Google
            </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
