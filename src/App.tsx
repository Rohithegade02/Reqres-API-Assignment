import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Users from './pages/users/page'
import Login from './pages/login/page'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import { initializeAuth } from './slice/authSlice'
import { RootState } from './store'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  return (
    <div className='p-10'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/users'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path='/users'
            element={!isAuthenticated ? <Navigate to='/' replace /> : <Users />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
