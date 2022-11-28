import { useState } from 'react'
import NewPerson from './components/NewPerson'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === personObject.name).length > 0) {
      alert(personObject.name + " is already added to the phonebook")
    } else if (persons.filter(person => person.number === personObject.number).length > 0) {
      alert(personObject.number + " is already added to the phonebook")
    } else {
      console.log("New person is not already added")     
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPerson newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />
    </div>
  )

}

export default App