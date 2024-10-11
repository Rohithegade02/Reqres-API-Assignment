import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to='/' replace />
}

export default PrivateRoute
