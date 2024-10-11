import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UserData } from '../types'

// Define the base URL for the API
const baseURL = 'https://reqres.in'

// Create an async thunk for fetching data
export const fetchData = createAsyncThunk<UserData, number>(
  'data/fetchData',
  async (page: number) => {
    const response = await fetch(`${baseURL}/api/users?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return response.json()
  },
)

// Create the slice with initial state, including type annotations
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [] as User[], // Data type is an array of User
    status: 'idle', // idle, loading, succeeded, or failed
    totalPages: 0,
    page: 0,
    error: null as string | null, // Error message if fetching fails
  },
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(user => user.id !== action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      // Find the index of the user in the state and update
      const index = state.data.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.data[index] = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'succeeded'
          state.data = action.payload.data
          state.totalPages = action.payload.total_pages
          state.page = action.payload.page
        },
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})
export const { deleteUser, updateUser } = dataSlice.actions
export default dataSlice.reducer
