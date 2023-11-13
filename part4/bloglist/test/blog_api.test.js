/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
  ]

beforeEach(async () => {
  
  await Blog.deleteMany({})
  await Blog.create(initialData)
}, 10000)


test('blogs are returned as json', async () => { 
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('initial blog lengths is 6', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(6)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(element => {
    expect(element.id).toBeDefined()
  });
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogData = await Blog.find({})
  
  expect(blogData.length).toBe(initialData.length + 1)
})

test('likes property defaults to zero if not provided', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
  
  expect(response.body.likes).toBe(0)
})

test('validation for missing title or url', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    likes: 2
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  expect(response.body.error).toBe('title or url missing')

})

test('deletion of a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogsToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body.length).toBe(
    blogsAtStart.body.length - 1
  )
})

test('update of a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]
  blogToUpdate.likes = blogToUpdate.likes + 1

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
  
  expect(response.body.likes).toBe(blogToUpdate.likes)
})

afterAll( async () => {
  await mongoose.connection.close()
})