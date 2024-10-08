import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Users from './pages/users/page'
import Login from './pages/login/page'

function App() {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div className='max-w-[100vw]'>
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
