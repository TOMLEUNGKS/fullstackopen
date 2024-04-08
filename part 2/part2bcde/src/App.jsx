import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchWord, setSearchWord] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showAddNotice, setAddNotice] = useState(false)
  const [noticeName, setNoticeName] = useState('')
  const [showChangeNotice, setChangeNotice] = useState(false)
  const [showErrorNotice, setErrorNotice] = useState(false)
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
    setShowSearch(true)
  }

  const handleDelete = (person) => {
    const confirm = window.confirm(`Delete ${person.name} ?`)
    if (confirm) {
      personService
      .remove(person.id)
      .then(response => {
        const updatedPersons = persons.filter((p) => p.id !== response.id)
        setPersons(updatedPersons)
      })
      .catch(_ => {
        setErrorNotice(true)
        setNoticeName(newName)
      })
    }
  }

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
      showAddNotice={showAddNotice} setAddNotice={setAddNotice} 
      noticeName={noticeName} setNoticeName={setNoticeName}
      showChangeNotice={showChangeNotice} setChangeNotice={setChangeNotice}
      showErrorNotice={showErrorNotice} setErrorNotice={setErrorNotice}
      />
      <SearchFilter searchWord={searchWord} handleSearch={handleSearch}/>
      <PersonForm 
      persons={persons} setPersons={setPersons} 
      setAddNotice={setAddNotice} setChangeNotice={setChangeNotice}
      setNoticeName={setNoticeName}
      newName={newName} setNewName={setNewName} 
      newNum={newNum} setNewNum={setNewNum}
      setErrorNotice={setErrorNotice}/>
      <h2>Numbers</h2>
      <div>
        {showSearch? 
        <Persons 
        persons={persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))}
        setPersons={setPersons}
        handleDelete={handleDelete}
        />
        :<Persons persons={persons} setPersons={setPersons} handleDelete={handleDelete}/>
      }
      </div>
    </div>
  )
}

export default App