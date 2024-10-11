import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slice/dataSlice'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './slice/UserSlice'
import authReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    auth: authReducer,
  },
  devTools: false,
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
