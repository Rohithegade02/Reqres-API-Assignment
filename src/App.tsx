import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Users from './pages/users/page'
import Login from './pages/login/page'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  console.log(isAuthenticated)
  return (
    <div className='max-w-[100vw] bg-[#191E22] p-10'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          // {/* Private route only can be accessed when authenticated */}
          <Route
            path='/users'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Users />
              </PrivateRoute>
            }
          />
          {/* Redirect to login if not authenticated */}
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
