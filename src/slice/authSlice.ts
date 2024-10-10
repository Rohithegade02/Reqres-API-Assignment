import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserLogin } from '../types'

// Define initial state
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: 'idle', // To track the state of async operations like login
  error: null,
}
const baseURL = 'https://reqres.in'

// Async thunk to handle login API call
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
      return result // This will contain the token and user data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout functionality
    logout: state => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
  },
  extraReducers: builder => {
    // Handle pending state
    builder.addCase(loginUser.pending, state => {
      state.status = 'loading'
      state.error = null
    })

    // Handle fulfilled state (successful login)
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.status = 'succeeded'
    })

    // Handle rejected state (failed login)
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed'
      //   state.error = action.payload || 'Failed to login'
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
