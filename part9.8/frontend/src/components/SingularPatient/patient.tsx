import React from 'react'
import { useParams } from 'react-router-dom';
import Occupational from './Occupational'
import Hospital from './Hospital'
import HealthCheck from './HealthCheck'
import { Entry } from '../../types'

const PatientPage = (props: any) => {
    const { id } = useParams()
    const patient = props.patients.find((patient: any) => patient.id === id)
    // const diagnosis = props.diagnosis.find((d: any) => patient.entries[0].diagnosisCodes.includes(d.code))

    const EntryDetails = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <Hospital entry={entry}/>
            case "OccupationalHealthcare":
                return <Occupational entry={entry} />
            case "HealthCheck": 
                return <HealthCheck entry={entry}/>
            default:
                return <div>bals</div>
        }
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>entries</h2>
            {patient.entries.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
        </div>
    )
}

export default PatientPage