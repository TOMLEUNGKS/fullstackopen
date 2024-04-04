import axios from "axios"
import { useState } from "react"

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    
    const addPerson= (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
          const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if (confirm) {
            const person = persons.find(p => p.name === newName)
            const changedPerson = {...person, number: newNum}
            axios
            .put('http://localhost:3001/persons/' + person.id, changedPerson)
            .then(response => {
              console.log("response.data", response.data)
              setPersons(persons.map(p => p.id !== person.id ? p : response.data))
              setNewName('')
              setNewNum('')
            })
          } else return
          return
        }
        const personObject = {
          name: newName,
          number: newNum,
          id: Date.now().toString(36)
        }
        axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNum('')
        })
      }

      const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNumChange = (event) => {
        setNewNum(event.target.value)
      }


    return (
        <form onSubmit={addPerson}>
            <h2>add a new</h2>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNum} onChange={handleNumChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm