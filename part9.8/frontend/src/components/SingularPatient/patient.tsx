import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Occupational from './Occupational'
import Hospital from './Hospital'
import HealthCheck from './HealthCheck'
import { Entry } from '../../types'
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios'

interface Props {
    onCancel: () => void;
}

const PatientPage = (props: any) => {
    const [type, setType] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [spec, setSpec] = useState('')
    const [health, setHealth] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [codes, setCodes] = useState<string[]>([])
    const [showForm, setShowForm] = useState(false)
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
                return <div></div>
        }
    }

    const Form = ({ onCancel }: Props) => {
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = {
              type: type,
              date: date,
              specialist: spec,
              diagnosisCodes: codes,
              description: desc,
              discharge: null, // Replace with the actual discharge data if needed
              healthCheckRating: health
            };
            const url = `http://localhost:3001/api/patients/${id}/entries`;
            try {
              const response = await axios.post(url, data);
              console.log(response.data); // Do something with the response data if needed
              onCancel();
            } catch (error) {
                console.error(error);
                setErrorMessage('An error happened');
            }
            setType('')
            setDesc('');
            setDate('');
            setSpec('');
            setHealth('');
            setCodes([]);
          };
        return (
            <div>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Hospital visit reason"
          fullWidth 
          value={type}
          onChange={({ target }) => setType(target.value)}
        />
        <TextField
          label="Description"
          fullWidth 
          value={desc}
          onChange={({ target }) => setDesc(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={spec}
          onChange={({ target }) => setSpec(target.value)}
        />
        <TextField
          label="Healthcheck rating 0-3"
          fullWidth
          value={health}
          onChange={({ target }) => setHealth(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={codes.join(',')}
          onChange={({ target }) => setCodes(target.value.split(','))}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => {onCancel()}}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
        )
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
            {errorMessage && <p>{errorMessage}</p>}
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                ADD NEW ENTRY
            </Button>
            {showForm ? (
                <Form onCancel={() => setShowForm(false)} />
            ) : null}
        </div>
    )
}

export default PatientPage