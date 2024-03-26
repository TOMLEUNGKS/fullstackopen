import { useState } from "react"

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = props.good + props.neutral + props.bad

  if ((props.good + props.neutral + props.bad) == 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(good*1 + neutral*0 + bad*(-1))/all}/>
      <StatisticLine text="positive" value={(good/all)*100 + "%"}/>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const handleVotes = (index) => {
    const newVotes = [...votes]
    newVotes[index%8]++
    setVotes(newVotes)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const highestVoteIndex = votes.indexOf(Math.max(...votes))

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <h3>{anecdotes[selected % 8]}</h3>
        <h3>{votes[selected % 8]} votes</h3>
        <button onClick={() => {handleVotes(selected); returnMaxValueIndex(votes);}}>vote</button>
        <button onClick={() => setSelected(selected + 1)}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <h3>{anecdotes[highestVoteIndex]}</h3>
      </div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App
