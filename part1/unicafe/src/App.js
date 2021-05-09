import React, { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const avg = (good - bad) / total
  const percentGood = (good / total) * 100

  return (
    <div>
      <Title text='statistics'/>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <Display text='all' value={total} />
      <Display text='average' value={avg} />
      <Display text='positive' value={percentGood} />
    </div>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App