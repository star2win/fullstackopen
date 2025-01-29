import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
    <br />{props.text} {props.value}
    </>
  )
}

const Statistics = (props) => {
  console.log(props)
  
  if (props.all === 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
    <h1>statistics</h1>
    <p>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </p>
    </>
  )
}

const Button = (props) => {
  return (
    <>
    <button onClick={() => props.onClick(props.value)}>
    {props.text}
    </button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = good / all

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setGood} value={good + 1} text="good" />
      <Button onClick={setNeutral} value={neutral + 1} text="neutral" />
      <Button onClick={setBad} value={bad + 1} text="bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App