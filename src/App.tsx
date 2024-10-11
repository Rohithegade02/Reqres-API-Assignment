import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Users from './pages/users/page'
import Login from './pages/login/page'
import PrivateRoute from './components/PrivateRoute'
import { initializeAuth } from './slice/authSlice'
import { RootState } from './store'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  useEffect(() => {
    dispatch(initializeAuth())
    setLoading(false)
  }, [dispatch])

  return (
    <div className='p-10'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/users'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} loading={loading}>
                <Users />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
