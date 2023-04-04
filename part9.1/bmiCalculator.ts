export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height/100) ** 2

    if (bmi < 18.5) {
        return 'Underweight'
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)'
    }
    if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight'
    }
    return 'Obesity'
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
calculateBmi(height, weight)