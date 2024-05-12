import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        console.log('state', state)
        const filterValue = state.filter.toLowerCase()
        return state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(filterValue))
            .sort((a, b) => b.votes - a.votes)
    });

  const dispatch = useDispatch();

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
