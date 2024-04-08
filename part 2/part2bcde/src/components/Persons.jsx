// import axios from "axios"

const Persons = ({persons, setPersons, handleDelete}) => {

  // const handleDelete = (person) => {
  //   const confirm = window.confirm(`Delete ${person.name} ?`)
  //   if (confirm) {
  //     axios
  //     .delete('http://localhost:3001/persons/'+person.id)
  //     .then(response => {
  //       const updatedPersons = persons.filter((p) => p.id !== response.data.id)
  //       setPersons(updatedPersons)
  //     })
  //   }
  // }

  return (
      <>
        {persons.map(person => (
          <div key={person.id}>
            <span>{person.name} {person.number} </span>
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        ))
        }
    </>
  )
}

export default Persons