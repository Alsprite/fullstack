import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h2>No feedback given</h2>
      <h1>Statistics</h1>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.all}</p>
      <p>Average {props.average}</p>
      <p>Positive {props.positive}%</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const all2 = good + bad
  const goodOnes = good
  const average = goodOnes / all2
  const positive = average * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} all2 = {all2} goodOnes = {goodOnes} average = {average} positive = {positive} />
    </div>
  )
}

export default App