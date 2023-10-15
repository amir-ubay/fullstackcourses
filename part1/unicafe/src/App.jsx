import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isGiven, setIsGiven] = useState(false);

  const average = Math.round(((good - bad) / (good + neutral + bad)) * 100);
  const positive = Math.floor((good / (good + neutral + bad)) * 100);

  const handleGoodClick = () => {
    setGood(good + 1);
    setIsGiven(true);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setIsGiven(true);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setIsGiven(true);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button>
        <button onClick={handleBadClick}>Bad</button>
      </div>
      <h1>Statistics</h1>
      {isGiven ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          positive={positive}
        />
      ) : (
        <>
          <h3>No feedback give</h3>
        </>
      )}
    </>
  );
};

const Statistics = ({ good, neutral, bad, average, positive }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="Good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="Neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="Bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="All" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticLine text="Average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="Positive" value={positive + "%"} />
          </tr>
        </tbody>
      </table>
      {/* <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <div>All: {good + neutral + bad}</div>
      <div>Average: {average ? average : 0}</div>
      <div>Positive feedback: {positive ? positive : 0}%</div> */}
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}:</td>
      <td>{value}</td>
    </>
  );
};

//

export default App;
