import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";
import blogsReducer from "./blogSlice";
import userDataReducer from "./userDataSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blog: blogsReducer,
    userData: userDataReducer
  }
})

export default store