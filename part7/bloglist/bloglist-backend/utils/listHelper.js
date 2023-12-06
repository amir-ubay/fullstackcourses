/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const topFavorit = (blogs) => {
  const rank = blogs.map(blog => blog.likes)
  const sorted = rank.sort((a, b) => b - a)
  const top = blogs.find(n => n.likes === sorted[0])
  return top
}

const mostBloger = (blogs) => {
  const count = {}
  blogs.forEach(blog => {
    if (count[blog.author]) {
      count[blog.author] += 1
    } else {
      count[blog.author] = 1
    }
  })
  
  const author = Object.keys(count).reduce((a, b) => {
    return count[a] > count[b] ? a : b
  })

  const result = {
    author,
    blogs: count[author]
  }

  return result
}

const mostLikes = (blogs) => {
  const count = {}
  blogs.forEach(blog => {
    if (blog.author in count) {
      count[blog.author] += blog.likes
    } else {
      count[blog.author] = blog.likes
    }
  })

  const author = Object.keys(count).reduce((a, b) => {
    return count[a] > count[b] ? a : b;
  })

  const result = {
    author: author,
    likes: count[author]
  }

  return result
}
  
module.exports = {
  dummy,
  totalLikes,
  topFavorit,
  mostBloger,
  mostLikes
}