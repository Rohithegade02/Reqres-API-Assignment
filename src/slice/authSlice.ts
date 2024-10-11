import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: state => {
      const token = localStorage.getItem('token')
      if (token) {
        state.isAuthenticated = true
        state.token = token
      }
    },
    login: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    logout: state => {
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
  },
})

export const { initializeAuth, login, logout } = authSlice.actions
export default authSlice.reducer
