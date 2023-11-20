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
  console.log('request: ', request)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers : { "authorization" : token}
  }
  
  const request = await axios.post(baseUrl, blog, config)
  console.log('request data: ', request.data)
  return request.data
}

export default { getAll, setToken , create}