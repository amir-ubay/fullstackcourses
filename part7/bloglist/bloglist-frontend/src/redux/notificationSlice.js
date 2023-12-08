import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: null,
    message: null
  },
  reducers: {
    setNotification(state, action) {
      state.type = action.payload.type
      state.message = action.payload.message
    }
  }
})

export const { setNotification } = notificationSlice.actions
export const selectNotification = (state) => state.notification

export default notificationSlice.reducer

export const showNotification = (type, message) => {
  return dispatch => {
    dispatch(setNotification({ type, message }))
    setTimeout(() => {
      dispatch(setNotification({ type: null, message: null }))
    }, 5000)
  }
}