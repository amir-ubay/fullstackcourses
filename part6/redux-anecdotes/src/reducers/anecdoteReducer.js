import { createSlice } from "@reduxjs/toolkit"
import anectoteService from "../services/anecdotes"
import { setNotificationMessage } from "../reducers/notificationReducer";


// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const data = action.payload
      state.push(data)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const toVote = state.find(item => item.id === id)
      const votedAnecdote = {
        ...toVote,
        votes: toVote.votes + 1
      }
      return state.map(item => item.id !== id ? item : votedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anectoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anectoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotificationMessage(`${newAnecdote.content} added successfuly`, 6000));
  }
}

export const giveVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anectoteService.vote(id)
    dispatch(voteAnecdote(updatedAnecdote.id))
    dispatch(setNotificationMessage(`${updatedAnecdote.content} voted successfuly`, 1000))
  }
}