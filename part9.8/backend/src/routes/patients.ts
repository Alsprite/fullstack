import express from 'express'
import patientService from "../services/patientService"

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getAll())
})

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    })
    res.json(newPatient)
})

export default router