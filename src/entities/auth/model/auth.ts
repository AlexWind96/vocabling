import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@/shared/api'
import { login, logout, register, saga } from './sagas'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanAuthData() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.success.toString(), (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user = action.payload
    })
    builder.addCase(logout.success.toString(), (state) => {
      state.isLoggedIn = false
      state.user = null
    })
    builder.addCase(login.success.toString(), (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user = action.payload
    })
  },
})

//ACTIONS

export const actions = {
  ...authSlice.actions,
  register,
  logout,
  login,
}

//SELECTORS
const selectAuthState = (state: RootState) => state.auth

export const selectors = {
  selectAuthState,
}
//Reducer
export const reducer = authSlice.reducer

export { saga }
