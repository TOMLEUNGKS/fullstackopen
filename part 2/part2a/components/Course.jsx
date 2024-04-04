const Course = ({courses}) => {
  console.log("courses", courses)
  return (
    <div>
      {courses.map(course =>
          <div key={course.id}>
            <h3 key={course.id}>{course.name}</h3>
            {course.parts.map(part =>
              <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <h4>total of {course.parts.reduce((sum, currentValue) =>
            sum + currentValue.exercises
            ,0)} exercises</h4>
          </div>
        )}
        
      </div>
)
}

export default Course