import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './pages/users/page'
import Login from './pages/login/page'
import React from 'react'

function App() {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div className='max-w-[100vw] bg-[#191E22] p-10'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

// {/* Private route only can be accessed when authenticated */}
// <Route
// path='/todo'
// element={
//   <PrivateRoute isAuthenticated={isAuthenticated}>
//     <TodoList />
//   </PrivateRoute>
// }
// />
// {/* Redirect to login if not authenticated */}
// <Route
// path='/todo'
// element={
//   !isAuthenticated ? <Navigate to='/login' replace /> : <TodoList />
// }
// />
