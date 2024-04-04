import { useState } from 'react'
import SearchFilter from '../components/SearchFilter'
import PersonForm from '../../part2a/components/PersonForm'
import Persons from '../../part2a/components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [searchWord, setSearchWord] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
    setShowSearch(true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchWord={searchWord} handleSearch={handleSearch}/>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <div>
        {showSearch? 
        <Persons persons={persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))}/>
        :<Persons persons={persons}/>
      }
      </div>
    </div>
  )
}

export default App