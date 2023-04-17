import { useParams } from 'react-router-dom';

const PatientPage = (props: any) => {
    const { id } = useParams()
    const patient = props.patients.find((blog: any) => blog.id === id)
    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>entries</h2>
            <p>{patient.entries[0].date} {patient.entries[0].description}</p>
            <ul>
                {patient.entries[0].diagnosisCodes.map((diagnosis: any) => 
                    <li key={diagnosis}>{diagnosis}</li>    
                )}
            </ul>
        </div>
    )
}

export default PatientPage