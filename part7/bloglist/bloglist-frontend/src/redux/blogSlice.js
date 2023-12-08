import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    }
  }
})

export const { addBlog } = blogSlice.actions
export const selectBlogs = (state) => state.blog

export default blogSlice.reducer

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(addBlog(blogs))
    console.log("blogs >", blogs)
  }
}