import React from 'react'

const NewPerson = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
            Name: <input value={props.newName} onChange={props.handleNameChange} />
            <br />
            Number: <input value={props.newNumber} onChange={props.handleNumberChange} type="number" />
            <br />
            <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewPerson