import personService from '../services/persons'

const PersonForm = ({persons, setPersons, 
  setAddNotice, setNoticeName, setChangeNotice,
  setErrorNotice,
  newName, setNewName, newNum, setNewNum}) => {
    
    const addPerson= (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
          const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if (confirm) {
            const person = persons.find(p => p.name === newName)
            const changedPerson = {...person, number: newNum}

            personService
            .update(person.id, changedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id !== person.id ? p : response))
              setChangeNotice(true)
              setNoticeName(newName)
              setNewName('')
              setNewNum('')
            })
            .catch(_ => {
              setErrorNotice(true)
              setNoticeName(newName)
            })
          } else return
          return
        }
        const personObject = {
          name: newName,
          number: newNum,
          id: Date.now().toString(36)
        }

        personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setAddNotice(true)
          setNoticeName(newName)
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