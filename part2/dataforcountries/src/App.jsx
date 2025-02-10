import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({country}) => {

  if (!country) {
    return
  }

  return (
  <div>
    <h1>{country.name.common}</h1>
    capital {country.capital}<br />
    area {country.area}<br />
    <h3>languages:</h3>
    {/* {console.log(country.languages)} */}
    <ul>
    {Object.keys(country.languages).map(language => <li>{country.languages[language]}</li>)}
    </ul>
    <img src={country.flags.png} />
    {/*
    <pre>
      {JSON.stringify(country, null, 2)}
    </pre>    
    */}
  </div>
  )
}

const App = () => {
  const [search, setSearch] = useState()
  const [country, setCountry] = useState()
  const [countries, setCountries] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('country is now', country)

    if (!countries) {
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(c => c.name.common))
      })
    }

    if (search) {
      console.log('fetching country...', search)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${search}`)
        .then(response => {
          setCountry(response.data)
        })
        .catch(error => {
          console.log('country not found...')
        })
    }
  }, [search])

  const handleChange = (event) => {
    const searchName = event.target.value
    console.log(searchName)
    const countriesMatched = countries.filter(c => c.toLowerCase().startsWith(searchName.toLowerCase()))
    console.log(countriesMatched.length)

    if (countriesMatched.length > 10) {
      return (
        setMessage('Too many matches, specify another filter')
      )
    } else if (countriesMatched.length > 1) {
      const countriesMessage = countriesMatched.map(c => (<div key={c}>{c}<button onClick={(() => setSearch(c))}>show</button><br /></div>))
      setMessage(countriesMessage)
    } else if (countriesMatched.length === 1) {
      setMessage(null)
      setSearch(countriesMatched[0])
    } else {
      setMessage('No countries matched')
    }
  }

  return (
    <div>
      {countries && ( // Conditionally render the form and other content
        <div>
        <form>
          find countries: <input search={search} onChange={handleChange} />
        </form>
        {message}
        
        <Country country={country} />
        {/*
        <br></br>
        Countries List:
        <pre>
          Number of countries:  {countries.length}
          <br></br>
          {countries.map(c => c + '\n')}
        </pre>
        */}
      </div>
      )}
      {!countries && <p>Loading countries...</p>}
    </div>
  )
}

export default App