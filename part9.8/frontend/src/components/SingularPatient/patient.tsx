import { useParams } from 'react-router-dom';

const PatientPage = (props: any) => {
    const { id } = useParams()
    const patient = props.patients.find((patient: any) => patient.id === id)
    const diagnosis = props.diagnosis.find((d: any) => patient.entries[0].diagnosisCodes.includes(d.code))
    console.log(diagnosis)
    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>entries</h2>
            <p>{patient.entries[0].date} {patient.entries[0].description}</p>
            <ul>
                {patient.entries[0].diagnosisCodes.map((diag: any) => 
                    <li key={diag}>{diag} {diagnosis.name}</li>
                )}
            </ul>
        </div>
    )
}

export default PatientPage