const Course = ({course}) => {
    return (
      <>
        <Header text={course.name}/>
        <Content parts={course.parts}/> 
        <Total parts={course.parts}/>
      </>
      
    )
  }
  
  const Header = ({text}) => {
    return (
      <h1>{text}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <>
      {parts.map((part) => <Part key={part.id} part={part}/>)}
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Total = ({parts}) => {
  
    const total = parts.reduce((acc, item) => acc + item.exercises, 0)
  
    return (
      <p><b>Total of {parts.reduce((carry, part) => carry + part.exercises, 0)} exercises</b></p>
    )
  }

export default Course