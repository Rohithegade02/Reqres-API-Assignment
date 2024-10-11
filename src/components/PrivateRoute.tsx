import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ isAuthenticated, children, loading }) => {
  if (loading) {
    return <div>Loading...</div> // or some other loading indicator
  }

  return isAuthenticated ? children : <Navigate to='/' replace />
}

export default PrivateRoute
