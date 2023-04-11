import patientData from "../../data/patients"
import { NonSensitivePatientData } from "../types"
// import { v1 as uuid } from "uuid"

const patients: NonSensitivePatientData[] = patientData as NonSensitivePatientData[]
  
  const getAll = (): NonSensitivePatientData[] => {
    return patients;
  };

export default { getAll }