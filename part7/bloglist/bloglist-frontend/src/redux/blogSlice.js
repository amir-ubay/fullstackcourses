import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    }
  }
})

export const { addBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions
export const selectBlogs = (state) => state.blog

export default blogSlice.reducer

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
    console.log("newBlog created >", newBlog)
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(blog)
    dispatch(removeBlog(blog))
    console.log("deleted blog > ", deletedBlog)
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await blogService.addLike(blog)
    dispatch(updateBlog(updatedBlog))
    console.log('like blog > ', response.data)
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, comments: blog.comments.concat({text: comment}) }
    const response = await blogService.comment(blog, comment)
    dispatch(updateBlog(updatedBlog))
    console.log('comment blog > ', response.data)
  }
}
