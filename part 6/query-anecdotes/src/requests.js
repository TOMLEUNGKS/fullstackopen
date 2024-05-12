import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    // console.log('response.data', response.data)
    return response.data
}

export const createAnecdote = async (content) => {
    const object= { content: content, votes: 0, id: Math.floor(Math.random() * 10000).toFixed(0)}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const voteAnecdote = async (anecdote) => {
    const object= { ...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, object)
    return response.data
}
