import { CoursePart } from "../types";

const Content = ({ course }: { course: CoursePart[] }) => {
  return (
    <>
      {course.map((course) => {
        switch (course.kind) {
          case "basic":
            return (
              <>
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                </p>
                <p>
                  <i>{course.description}</i>
                </p>
              </>
            );
          case "group":
            return (
              <>
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                </p>
                <p>project exercises {course.groupProjectCount}</p>
              </>
            );
          case "background":
            return (
              <>
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                </p>
                <p>
                  <i>{course.description}</i>
                </p>
                <p>
                  <i>{course.backgroundMaterial}</i>
                </p>
              </>
            );
          case "special":
            return (
              <>
                <p>
                  <b>
                    {course.name} {course.exerciseCount}
                  </b>
                </p>
                <p>
                  <i>{course.description}</i>
                </p>
                <p>required skills: {course.requirements.join(", ")}</p>
              </>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Content;
