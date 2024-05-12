import React from "react"
import { useDispatch, useSelector } from "react-redux"

const App = () => {

    const dispatch = useDispatch()
    const { good, ok, bad } = useSelector(state => state)

    return (
      <div>
        <button onClick={e => dispatch({type: 'GOOD'})}>good</button> 
        <button onClick={e => dispatch({type: 'OK'})}>ok</button> 
        <button onClick={e => dispatch({type: 'BAD'})}>bad</button>
        <button onClick={e => dispatch({type: 'ZERO'})}>reset stats</button>
        <div>good {good}</div>
        <div>ok {ok}</div>
        <div>bad {bad}</div>
      </div>
    )
  }

export default App