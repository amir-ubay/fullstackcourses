import { Component, useEffect, useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState({average:0, positive:0})

  const handleGood = () => {
    const updated = good + 1
    setGood(updated)
    console.log('setGood: ', updated)
  }

  const handleNeutral = () => {
    const updated = neutral + 1
    setNeutral(updated)
    console.log('setNeutral ', updated)
  }

  const handleBad = () => {
    const updated = bad + 1
    setBad(bad + 1)
    console.log('setBad', updated)
  }

  useEffect(()=>{
    let total = good + bad + neutral
    let goodScore = good * 1
    let badScore = bad * -1
    console.log('Set Positive')
    let positiveScore = good / total * 100
    console.log('Set Average')
    let averageScore = (goodScore + badScore) / total
    total > 0 ? setScore({
      ...score,
      positive: positiveScore,
      average: averageScore
    }) : console.log('No Feedback Given')
  }, [good, neutral, bad])
 
  return (
    <div>
      <Feedback setBad={handleBad} setGood={handleGood} setNeutral={handleNeutral}/>
      <Statistics good={good} neutral={neutral} bad={bad} score={score}/>
    </div>
  )
}

const Feedback = ({setGood, setBad, setNeutral}) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text='Good' onClick={setGood}/>
      <Button text='neutral' onClick={setNeutral}/>
      <Button text='BAD' onClick={setBad}/>
    </>
  )
}

const Statistics = ({good, neutral, bad, score}) => {
  
  const total = good + neutral + bad

  const content = <>
  <h1>
    Statistics
  </h1>
  <table>
    <tbody>
      <Data text='Good' value={good}/>
      <Data text='neutral' value={neutral}/>
      <Data text='BAD' value={bad}/>
      <Data text='TOTAL' value={total}/>
      <Data text='Average' value={score.average}/>
      <Data text='Positive' value={score.positive}/>
    </tbody>
  </table>  
</>
  
  return (
    <>
      {total > 0? content : <p>No feedback given</p>}
    </>
  )
}

const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Data = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}:
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

export default App