import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  name: '',
  password: '',
  isLogin: false,
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.name = action.payload.name
      state.password = action.payload.password
    },
    setLogin(state, action) {
      state.isLogin = true
      state.token = action.payload.token
    },
    setLogout(state) {
      state.isLogin = false
    }
  }
})

export const { setUser, setLogin, setLogout } = userSlice.actions
export const selectUser = state => state.user

export default userSlice.reducer