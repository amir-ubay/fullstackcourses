const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ part }) => {
  return (
    <>
      {part.map((part) => {
        return (
          <Part key={part.name} part={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

const Total = ({ part }) => {
  const total = part.reduce((a, b) => a + b.exercises, 0);

  return <p>Number of exercises {total}</p>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

export default App;
