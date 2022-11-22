import { useState } from 'react'
import Randomizer from 'react-randomizer'
const Button = (props) => {
  return (
    <div>
      <button onClick={() => props.handleClick()}>{props.text}</button>
    </div>
  )
}
const StatisticLine = (props) => {
  return (
    <div>
      <table>
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{props.value}</td>
            </tr>
          </tbody>
      </table>
    </div>
  )
}
const Statistics = (props) => {
  let good = props.good;
  let neutral = props.neutral;
  let bad = props.bad;

  if (neutral == 0 && good == 0 && bad == 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="Good" value = {props.good} />
      <StatisticLine text="Neutral" value = {props.neutral} />
      <StatisticLine text="Bad" value = {props.bad} />
      <StatisticLine text="All" value = {props.all} />
      <StatisticLine text="Average" value = {props.average} />
      <StatisticLine text="Positive" value = {props.positive + "%"} />
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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0);
  const [isShown, setIsShown] = useState(true);
  
  const points = [1, 4, 6, 3]

  const copy = [...points]
  // kasvatetaan taulukon paikan 2 arvoa yhdellä
  copy[2] += 1  

  return (  
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} all2 = {all2} goodOnes = {goodOnes} average = {average} positive = {positive} />
      <Button handleClick={() => {setSelected(Math.floor(Math.random() * anecdotes.length)); setIsShown(s => !s)}} text="Random anecdote" />
      <Button handleClick={() => points[anecdotes[selected]]+=1} text="Vote" />
      <p style={{display: isShown ? 'none' : 'block'}}>{anecdotes[selected]}</p>
      <p style={{display: isShown ? 'none' : 'block'}}>Votes: {points[anecdotes[selected]]}</p>
    </div>
  )
}

export default App