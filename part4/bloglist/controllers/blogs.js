const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => { 
      response.json(blogs)
    })
  .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  // Create a new blog with user data
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  const updatedBlogs = user.blogs.concat(savedBlog)

  await User.findByIdAndUpdate(user._id, {
   ...user, "blogs": updatedBlogs
  })

  response.status(200).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const theId = request.params.id
  const user = request.user
  const blog = await Blog.findById(theId) 

  console.log('blog.user: ', blog)
  console.log('user._id: ', user._id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'unauthorized'})
  } else {
    user.blogs = await user.blogs.filter(id => id.toString() !== theId)
    console.log("user data after filter: ", user)
    await User.findByIdAndUpdate(user.id, user)
    await Blog.findByIdAndDelete(theId)

    console.log(user)
    return response.status(204).json({message: 'Blog deleted'})
  }
})


blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  Blog
    .findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter