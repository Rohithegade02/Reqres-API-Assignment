import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UserData } from '../types'

const baseURL = 'https://reqres.in'

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

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [] as User[], 
    status: 'idle', 
    totalPages: 0,
    page: 0,
    error: null as string | null, 
  },
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(user => user.id !== action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
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
