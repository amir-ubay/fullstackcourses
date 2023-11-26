/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
// Import Click Library
import userEvent from '@testing-library/user-event'
import Toogle from './Toggleable'
import NewBlogForm from './NewBlogForm'

const blog = [
    {
    title: 'The Title',
    author: 'The Author',
    url: 'url',
    likes: 0,
    id: 1,
    user: {
      name: 'The User',
    }
  }
  ]

describe('Exercise 5.13 Blog List Tests', () => {
  test('renders blog content display blog title and author', () => {
  render(<Blog blogs={blog} />)
  const theTitle = screen.getByText('The Title')
  const theAuthor = screen.getByText('The Author')
  expect(theTitle).toBeDefined()
  expect(theAuthor).toBeDefined()
})

test('Get title and author using selector', () => {
  const { container } = render(<Blog blogs={blog} />)
  const divTitle = container.querySelector('[test-data="blog-title"]')
  const divAuthor = container.querySelector('#author')
  expect(divTitle).toHaveTextContent('The Title')
  expect(divTitle).toBeInTheDocument()
  expect(divAuthor).toHaveTextContent('The Author')
  expect(divAuthor).toBeInTheDocument()
})

test('Verify url and likes are not visible at first render', () => {
  const { container } = render(<Blog blogs={blog} />)
  // screen.debug(container)
  const divUrl = container.querySelector('#url')
  const divLikes = container.querySelector('#likes')
  expect(divUrl).toBeNull()
  expect(divLikes).toBeNull()
})
})

describe('Exercise 5.14 Expand blog content', () => {
  test('Show url and likes when button is clicked', async () => {
    const { container } = render(<Blog blogs={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    
    await user.click(button)

    const divUrl = container.querySelector('#url')
    const divLikes = container.querySelector('#likes')

    expect(divUrl).toBeInTheDocument()
    expect(divLikes).toBeInTheDocument()
    
    expect(divUrl).toHaveTextContent('url')
    expect(divLikes).toHaveTextContent('0')

     
  })
})

describe('Exercise 5.15 Add like button', () => {
  test('Clicking like button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<Blog blogs={blog} handleLike={mockHandler} />)

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
    console.log(mockHandler.mock.calls)
  })
})

describe('Exercise 5.16 new blog form', () => {
  test('Create new blog', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm addBlog={mockHandler} />)

    const titleInput = screen.getByPlaceholderText('input blog title')
    const authorInput = screen.getByPlaceholderText('input blog author')
    const urlInput = screen.getByPlaceholderText('input blog url')
    const submit = screen.getByText('create')

    await user.type(titleInput, 'blog title')
    await user.type(authorInput, 'blog author')
    await user.type(urlInput, 'blog url')
    await user.click(submit)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('blog title')
    expect(mockHandler.mock.calls[0][0].author).toBe('blog author')
    expect(mockHandler.mock.calls[0][0].url).toBe('blog url')
  })
})