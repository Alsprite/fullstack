import patientData from "../../data/patients";
import { NonSensitivePatientData, Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: NonSensitivePatientData[] = patientData as NonSensitivePatientData[];
  
const getAll = (): NonSensitivePatientData[] => {
    return patients;
};

const getOne = (id: string): NonSensitivePatientData | undefined => {
    return patients.find((patient) => patient.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = { id: uuid(), ...entry };
    patients.push(newPatient);
    return newPatient;
};

export default { getAll, getOne, addPatient };