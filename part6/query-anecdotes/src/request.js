import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const addAnecdote = content => axios.post(baseUrl, { content: content, votes: 0 }).then(res => res.data)

export const updateAnecdote = data => axios.put(`${baseUrl}/${data.id}`, data).then(res => res.data)