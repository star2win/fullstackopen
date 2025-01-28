const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old!</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='George' age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello name='Bob' />
      <p>{friends[0].name} {friends[0].age}</p>
    </>
  )
}

export default App
