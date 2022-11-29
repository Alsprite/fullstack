import React from 'react'

const Persons = (props) => {
    return (
        <div>
            <ul>
                {props.persons.map(person => 
                <p key={person.name} number={person.number} >{person.name} {person.number}</p>
                )}
            </ul>
        </div>
    )
}

export default Persons