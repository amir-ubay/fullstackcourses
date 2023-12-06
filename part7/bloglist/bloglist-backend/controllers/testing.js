const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// blogsRouter.delete('/drop-all', async (request, response, next) => {
//   if (process.env.NODE_ENV !== 'test') {
//     return response.status(403).json({ error: 'Forbidden: This action is only allowed in the test environment' })
//   }

//   try {
//     await User.deleteMany({})
//     await Blog.deleteMany({})

    // return response.status(200).json({ message: 'All users and blogs have been deleted' })
//   } catch (error) {
//     next(error)
//   }
// })

testingRouter.post('/reset-data', async(request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    return response.status(403).json({error: 'Forbidden: This action is only allowed in the test environtment'})
  }

  try {
    await User.deleteMany({})
    await Blog.deleteMany({})
    return response.status(200).json({ message: 'All users and blogs have been deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = testingRouter