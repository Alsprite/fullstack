const calculateBmi = (height: number, weight: number) => {
    const h = height / 100
    const endH = h * h
    const bmi = weight / endH

    if (bmi < 18.5) {
        console.log('Underweight')
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
        console.log('Normal (healthy weight)')
    }
    if (bmi >= 25 && bmi <= 29.9) {
        console.log('Overweight')
    }
    if (bmi >= 30) {
        console.log('Obesity')
    }
}

calculateBmi(180,60)