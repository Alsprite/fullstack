import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
    }
    if (persons.filter(person => person.name === personObject.name).length > 0) {
      alert(personObject.name + " is already added to the phonebook")
    } else {
      console.log("New person is not already added")     
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.name} >{person.name}</li>
          )}
      </ul>
    </div>
  )

}

export default App