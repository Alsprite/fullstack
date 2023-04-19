import { useState, useEffect } from 'react'
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
    const [errorMessage, setErrorMessage] = useState('');
    const [codes, setCodes] = useState<string[]>([])
    const [showForm, setShowForm] = useState(false)
    const [entries, setEntries] = useState<Entry[]>([])
    const [isDescFocused, setIsDescFocused] = useState(false);
    const [isDateFocused, setIsDateFocused] = useState(false);
    const [isSpecFocused, setIsSpecFocused] = useState(false);
    const [isHealthFocused, setIsHealthFocused] = useState(false);
    const [isCodesFocused, setIsCodesFocused] = useState(false);
    const { id } = useParams()
    const patient = props.patients.find((patient: any) => patient.id === id)
    // const diagnosis = props.diagnosis.find((d: any) => patient.entries[0].diagnosisCodes.includes(d.code))
    const handleDescBlur = () => {
      setIsDescFocused(false);
    };
    
    const handleDescFocus = () => {
      setIsDescFocused(true);
    };
    
    const handleDateBlur = () => {
      setIsDateFocused(false);
    };
    
    const handleDateFocus = () => {
      setIsDateFocused(true);
    };
    
    const handleSpecBlur = () => {
      setIsSpecFocused(false);
    };
    
    const handleSpecFocus = () => {
      setIsSpecFocused(true);
    };
    
    const handleHealthBlur = () => {
      setIsHealthFocused(false);
    };
    
    const handleHealthFocus = () => {
      setIsHealthFocused(true);
    };
    
    const handleCodesBlur = () => {
      setIsCodesFocused(false);
    };
    
    const handleCodesFocus = () => {
      setIsCodesFocused(true);
    };
    

    useEffect(() => {
      const fetchEntries = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/patients/${id}/entries`);
          console.log('response', response.data)
          setEntries(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchEntries();
    }, [id]);

    const EntryDetails = ({ entry }: { entry?: Entry }) => {
      if (!entry) {
        return null;
      }

      switch (entry.type) {
        case "Hospital":
          return <Hospital entry={entry}/>
        case "OccupationalHealthcare":
          return <Occupational entry={entry} />
        case "HealthCheck": 
          return <HealthCheck entry={entry}/>
        default:
          return null;
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
              discharge: null,
              healthCheckRating: health
            };
            const url = `http://localhost:3001/api/patients/${id}/entries`;
            try {
              const response = await axios.post(url, data);
              console.log(response.data);
              onCancel();
            } catch (error: any) {
              setErrorMessage(error.response.data.error)
            }
            setType('')
            setDesc('')
            setDate('')
            setSpec('')
            setHealth('')
            setCodes([])
          };
        return (
            <div>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label htmlFor="hospitalBtn">Hospital</label>
        <input type="radio" id="hospitalBtn" value="Hospital" onChange={({ target }) => setType(target.value)}></input>
        <label htmlFor="occupationalBtn">Occupational Healthcare</label>
        <input type="radio" id="occupationalBtn" value="OccupationalHealthcare" onChange={({ target }) => setType(target.value)}></input>
        <label htmlFor="healthBtn">Healthcheck</label>
        <input type="radio" id="healthBtn" value="HealthCheck" onChange={({ target }) => setType(target.value)}></input>
        <br></br>

        <TextField
          label="Description"
          fullWidth
          type="text"
          value={desc}
          onChange={({ target }) => setDesc(target.value)}
          onBlur={handleDescBlur}
          onFocus={handleDescFocus}
          autoFocus={isDescFocused}
        />
        <TextField
          label="Date"
          placeholder="DD-MM-YYYY"
          fullWidth
          type="text"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          onBlur={handleDateBlur}
          onFocus={handleDateFocus}
          autoFocus={isDateFocused}
        />
        <TextField
          label="Specialist"
          fullWidth
          type="text"
          value={spec}
          onChange={({ target }) => setSpec(target.value)}
          onBlur={handleSpecBlur}
          onFocus={handleSpecFocus}
          autoFocus={isSpecFocused}
        />
        <TextField
          label="Healthcheck rating 0-3"
          fullWidth
          type="number"
          value={health}
          onChange={({ target }) => setHealth(target.value)}
          onBlur={handleHealthBlur}
          onFocus={handleHealthFocus}
          autoFocus={isHealthFocused}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          type="text"
          value={codes.join(',')}
          onChange={({ target }) => setCodes(target.value.split(','))}
          onBlur={handleCodesBlur}
          onFocus={handleCodesFocus}
          autoFocus={isCodesFocused}
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
            {entries.map((entry: Entry) => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
            {errorMessage && <h3 style={{color: "red"}}>{errorMessage}</h3>}
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