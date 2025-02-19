const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

const cors = require('cors')
app.use(cors())

//morgan.token('post', (request) => JSON.stringify(request.body) || '')

morgan.token('post', (request) => {
    return request.method === 'POST' && Object.keys(request.body).length ? JSON.stringify(request.body) : '';
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let phonebook =
    [
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
    })

app.get('/info', (request, response) => {
    
    const now = new Date()

    // Change timezone to Europe/Helsinki
    const eetTimeHelsinki = now.toLocaleString('en-US', {
    timeZone: 'Europe/Helsinki',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long',
    hour12: false,
    })
    
    infoResponse = `Phonebook has info for ${phonebook.length} people 
        <br/><br/>${eetTimeHelsinki}`
    response.send(infoResponse)
    })

app.get('/api/persons/:id', (request, response) => {

    const personObject = phonebook.find(person => person.id === request.params.id)

    if (personObject) {
        response.json(personObject)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {

    phonebook = phonebook.filter(people => people.id !== request.params.id)
    response.status(204).end()

})

app.post('/api/persons', (request, response) => {

    
    randomId = Math.floor(Math.random() * 99999) + 1

    if (request.body.name && request.body.number) {

        if (phonebook.find(p => p.name === request.body.name)) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }

        personEntry = {
            id: randomId,
            name: request.body.name,
            number: request.body.number,
        }
        //console.log("Person added: ", personEntry)
        phonebook = phonebook.concat(personEntry)
        response.status(204).end()

    } else if (!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
          })
    }
})


const PORT = 3010
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })

