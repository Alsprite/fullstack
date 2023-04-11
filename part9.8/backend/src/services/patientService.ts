import patientData from "../../data/patients"
import { NonSensitivePatientData, Patient, NewPatient } from "../types"
import { v1 as uuid } from "uuid"

const patients: NonSensitivePatientData[] = patientData as NonSensitivePatientData[]
  
const getAll = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = { id: uuid(), ...entry }
    patients.push(newPatient)
    return newPatient
}

export default { getAll, addPatient }