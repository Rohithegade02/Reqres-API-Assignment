import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserLogin } from '../types'

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: 'idle',
  error: null,
}

const baseURL = 'https://reqres.in'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: UserLogin, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      localStorage.setItem('token', result.token)
      return result
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    initializeAuth: state => {
      const token = localStorage.getItem('token')
      if (token) {
        state.isAuthenticated = true
        state.token = token
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.status = 'loading'
      state.error = null
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.status = 'succeeded'
    })

    builder.addCase(loginUser.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const { logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
