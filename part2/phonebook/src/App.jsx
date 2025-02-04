import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
  }

  const personsToShow = () => {
    const searchResult = persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))
    console.log(searchResult)
    if (searchResult.length > 0) {
      return searchResult.map(person => <div key={person.id}>{person.name} {person.number}</div>)
    } else if (search === '') {
      return persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)
    }
  }

  return (
    <div>
      {/*
      <div>debug name: {newName}</div>
      <div>debug persons: {persons.map(person => person.name)}</div>
      */}

      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input  value={search}
                                    onChange={handleSearch}
                            />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input  value={newName} 
                        onChange={handleNameChange}
                />
        </div>
        <div>
          number:  <input value={newNumber}
                          onChange={handleNumberChange}
                   />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow()}
    </div>
  )
}

export default App