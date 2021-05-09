import React, { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad

  if (total === 0) {
    return <div>No feedback given</div>
  }

  const avg = (good - bad) / total
  const percentGood = (good / total) * 100

  return (
    <table>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={total} />
      <Statistic text='average' value={avg} />
      <Statistic text='positive' value={percentGood + '%'} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text='give feedback'/>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Title text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App