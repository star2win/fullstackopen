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

const Total = (props) => {
  const totalParts = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Number of exercises {totalParts}</p>
  )
}

const Course  = ( {course} ) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
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
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App