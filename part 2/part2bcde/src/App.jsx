import { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchWord, setSearchWord] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
    setShowSearch(true)
  }

  useEffect(() => {
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
      setPersons(response.data)      
    })  
    }, [])  

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchWord={searchWord} handleSearch={handleSearch}/>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <div>
        {showSearch? 
        <Persons 
        persons={persons.filter((person) => person.name.toLowerCase().includes(searchWord.toLowerCase()))}
        setPersons={setPersons}
        />
        :<Persons persons={persons} setPersons={setPersons}/>
      }
      </div>
    </div>
  )
}

export default App