import { useState } from 'react'
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
  var good = props.good;
  if (good == 0) {
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

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} all2 = {all2} goodOnes = {goodOnes} average = {average} positive = {positive} />
    </div>
  )
}

export default App