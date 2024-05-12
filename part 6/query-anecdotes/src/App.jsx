import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery} from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from './requests'
// import { useReducer } from 'react'
import { useNotificationDispatch } from './NotificationContext'

// const notificationReducer = (state, action) => {
//   if (action.type === 'NOTIFY') {
//     return action.data
//   }
//   return null
// }

const App = () => {
  const dispatch = useNotificationDispatch()
  // const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const voteAnecMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const index = anecdotes.findIndex(a => a.id === anecdote.id)
      anecdotes[index] = anecdote
      queryClient.setQueryData(['anecdotes'], anecdotes)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecMutation.mutate(anecdote)
    dispatch( {type: "NOTIFY", data: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => dispatch({type: "NOTIFY", data: null}), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
