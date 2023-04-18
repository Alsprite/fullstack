import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Occupational from './Occupational'
import Hospital from './Hospital'
import HealthCheck from './HealthCheck'
import { Entry } from '../../types'
import { Button, Grid, TextField } from '@mui/material';

interface Props {
    onCancel: () => void;
}

const PatientPage = (props: any) => {
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [spec, setSpec] = useState('')
    const [health, setHealth] = useState('')
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
                return <div>bals</div>
        }
    }

    

    const Form = ({ onCancel }: Props) => {
        return (
            <div>
      <form >
        <TextField
          label="Description"
          fullWidth 
          value={desc}
          onChange={({ target }) => setDesc(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="YYYY-MM-DD"
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
          value={codes}
          onChange={({ target }) => setCodes((prevCodes) => [...prevCodes, target.value.toString()])}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => {
                onCancel()
                setShowForm(false)
            }}
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
              onClick={() => {
                setShowForm(false)
              }}
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