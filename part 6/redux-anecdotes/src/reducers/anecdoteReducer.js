import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : voted)
    },
    // createAnecdote: (state, action) => {
    //   const newAnecdote = {
    //     content: action.payload,
    //     id: getId(),
    //     votes: 0
    //   }
    //   state.push(newAnecdote)
    // },
    appendAnecdotes: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(vote(anecdote.id))
    }
  }

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const anecdoteId = action.payload.id;
//       const anecdoteToUpdate = state.find(a => a.id === anecdoteId);
//       if (!anecdoteToUpdate) {
//         return state; // Return state unchanged if anecdote is not found
//       }
//       const votedAnecdote = {
//         ...anecdoteToUpdate,
//         votes: anecdoteToUpdate.votes + 1
//       };
//       return state.map(anecdote =>
//         anecdote.id !== anecdoteId ? anecdote : votedAnecdote
//       );
//     }
//     case 'NEW_ANECDOTE': {
//       const newAnecdote = action.payload.content;
//       return [...state, asObject(newAnecdote)];
//     }
//     default:
//       return state;
//   }
// };

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: { 
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default anecdoteReducer

export const { vote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer