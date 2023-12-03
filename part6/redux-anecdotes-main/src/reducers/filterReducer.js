import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterAnecdote = (keyword) => {
//   return {
//     type: 'SET_FILTER',
//     payload: keyword
//   }
// }


// export default filterReducer