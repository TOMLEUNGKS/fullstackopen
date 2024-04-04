import { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'
import PersonForm from '../../part2a/components/PersonForm'
import Persons from '../../part2a/components/Persons'
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
    console.log('effect')    
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)      
    })  
    }, [])  
    console.log('render', persons.length, 'persons')

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