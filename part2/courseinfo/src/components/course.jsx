const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ children }) => {
  return (
    <>
      <div className="content-container">{children}</div>
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Total = ({ data }) => {
  const totalArr = data.map((part) => {
    return part.exercises;
  });
  const total = totalArr.reduce((a, b) => a + b, 0);

  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content>
              {course.parts.map((part) => {
                return (
                  <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                  />
                );
              })}
            </Content>
            <Total data={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
