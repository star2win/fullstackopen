const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)

  const partList = props.parts.map(part => 
    <p key={part.id}>{part.name} {part.exercises}</p>
  )    

  return (
    <>
    {partList}
    </>
  )
}
/*
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + 
                            props.parts[1].exercises +
                            props.parts[2].exercises}
    </p>
  )
}
*/

const Course  = ( {course} ) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Debugging React apps',
        exercises: 15,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App