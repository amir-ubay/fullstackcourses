import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { "authorization" : token}
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const addLike = async (blog) => {
  const config = {
    headers : { "authorization" : token}
  }

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const remove = async (blog) => {
  const config = {
    headers : { "authorization" : token}
  }

  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers : { "authorization" : token}
  }
  
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

export default { getAll, setToken , create, addLike, remove}