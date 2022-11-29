import { useState, useEffect } from 'react'
import axios from 'axios'
import NewPerson from './components/NewPerson'
import Persons from './components/Persons'
import Search from './components/Search'
import Server from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    Server
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
    } else if (personObject.number < 0) {
      alert("dumbass you thought");
    } else {
      Server
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
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
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  const handleDelete = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`)) {
        Server
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id));
          alert(`${name} was deleted`)
          setNewName("");
          setNewNumber("");
        })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        newSearch={newSearch} handleSearch={handleSearch}
      />
      <h2>Add a new</h2>
      <NewPerson newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App