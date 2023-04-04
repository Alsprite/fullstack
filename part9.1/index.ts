import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    const bmi = calculateBmi(Number(height), Number(weight))
    if (!height || !weight || !height && !weight) {
        res.status(400).send({error: 'malformatted parameters'})
    }
    res.send({ height, weight, bmi })
})

app.post('/exercises', (req, res) => {
    const dailyHours = req.body.dailyHours.map(Number)
    const target = Number(req.body.target)
    if (!dailyHours || !target) {
      return res.status(400).json({ error: 'parameters missing' })
    }
  
    const result = calculateExercises(dailyHours, target)
    return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})