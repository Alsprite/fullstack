/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import patientService from "../services/patientService"

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getAll())
})

router.get('/:patientId', (req, res) => {
    res.send(patientService.getOne(req.params.patientId))
})

router.get('/:patientId/entries', (req, res) => {
    const patientEntries = patientService.getPatientEntries(req.params.patientId)
    if (!patientEntries) {
      return res.status(404).send('Patient not found');
    }
    return res.send(patientEntries)
  })

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body
    const newPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    })
    res.json(newPatient)
})

export default router