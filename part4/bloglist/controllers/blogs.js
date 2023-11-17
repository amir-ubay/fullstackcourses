const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => { 
      response.json(blogs)
    })
  .catch(error => next(error))
})

// blogsRouter.post('/', (request, response, next) => {
//   const body = request.body
//   const blog = new Blog(body)

//   if (!Object.prototype.hasOwnProperty.call(body, "likes")) {
//     blog.likes = 0
//   } else if (body.title === undefined || body.url === undefined) {
//     return response.status(400).json({ error: 'title or url missing' })
//   }

//   blog
//       .save()
//       .then(result => {
//         response.status(200).json(result)
//       })
//       .catch(error => next(error))
// })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // Check if the username exist
  const existingUser = await User.findOne({ username: body.username })
  if (!existingUser) {
    return response.status(400).json({error: 'No user found'})
  }

  // Create a new blog with user data
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: existingUser._id
  })

  const savedBlog = await blog.save()

  existingUser.blogs = existingUser.blogs.concat(savedBlog)

  await existingUser.save()

  response.status(200).json(savedBlog)
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(result => {
      console.log("result: ", result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  Blog
    .findByIdAndUpdate(request.params.id, body, { new: true })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter