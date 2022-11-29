import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            <ul>
                {props.persons.map(person => 
                <Person key={person.name} name={person.name} delete={props.handleDelete(person.name, person.id)} number={person.number} >{person.name} {person.number}</Person>
                )}
            </ul>

        </div>
    )
}

export default Persons