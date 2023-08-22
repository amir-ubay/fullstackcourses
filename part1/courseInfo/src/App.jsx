const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name:'Fundamentals of React',
      exercise:10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name:'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content part={parts}/>
      <Total part={parts}/>
    </div>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({part}) => {
  return (
      <>
        <Part partName={part[0].name} partAmount={part[0].exercise}/>
        <Part partName={part[2].name} partAmount={part[1].exercise}/>
        <Part partName={part[2].name} partAmount={part[2].exercise}/>
      </>
    )
}

const Part = ({partName, partAmount}) => {
  return (
    <>
      <p>
        {partName} {partAmount}
      </p>
    </>
  )
}

const Total = ({part}) => {
    
  return (
    <>
      <p>
        Number of exercies {part[0].exercise + part[1].exercise + part[2].exercise}
      </p>
    </>
  )
}

export default App