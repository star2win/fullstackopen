const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Content = (props) => {
    const partList = props.parts.map(part => 
      <p key={part.id}>{part.name} {part.exercises}</p>
    )    
  
    return (
      <>
      {partList}
      </>
    )
  }
  
  const Total = ( {parts} ) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p><b>total of {total} exercises</b></p>
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

  export default Course