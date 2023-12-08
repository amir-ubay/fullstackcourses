import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";
import blogsReducer from "./blogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blog: blogsReducer
  }
})

export default store