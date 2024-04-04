import { useState } from "react"

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    
    const addPerson= (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        } 
        setPersons([...persons, {name: newName, number: newNum, id: Date.now().toString(36)}])
        setNewName('')
        setNewNum('')
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