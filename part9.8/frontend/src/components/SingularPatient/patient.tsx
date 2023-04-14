import { useParams } from 'react-router-dom';

const PatientPage = (props: any) => {
    const { id } = useParams()
    const patient = props.patients.find((blog: any) => blog.id === id)
    return (
        <div>
            <h2>{patient.name}</h2>
            <h3>gender: {patient.gender}</h3>
            <h3>ssn: {patient.ssn}</h3>
            <h3>occupation: {patient.occupation}</h3>
        </div>
    )
}

export default PatientPage