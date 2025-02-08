import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {

  const handleSearch = (event) => {
    //console.log(event.target.value)
    props.setSearch(event.target.value)
  }
  return (
    <form>
            <div>
              filter shown with <input  value={props.search}
                                        onChange={handleSearch}
                                />
            </div>
          </form>
  )
}

const PersonForm = (props) => {

  const addName = (event) => {
    event.preventDefault()

    if (props.persons.find(person => person.name === props.newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: props.newName,
      number: props.newNumber,
      //id: String(props.persons.length + 1),
    }

    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        props.setPersons(props.persons.concat(response.data))
      })
    
    props.setNewName('')
    props.setNewNumber('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    props.setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
    <div>
      name: <input  value={props.newName} 
                    onChange={handleNameChange}
            />
    </div>
    <div>
      number:  <input value={props.newNumber}
                      onChange={handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Persons = (props) => {

  const searchResult = props.persons.filter(person => person.name.toLowerCase().startsWith(props.search.toLowerCase()))
  console.log(searchResult)
  if (searchResult.length > 0) {
    return searchResult.map(person => <div key={person.id}>{person.name} {person.number}</div>)
  } else if (props.search === '') {
    return props.persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)
  }

}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={search} setSearch={setSearch}/>
      
      <h2>Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} 
                  newName={newName} setNewName={setNewName} 
                  newNumber={newNumber} setNewNumber={setNewNumber}
      />
     
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App