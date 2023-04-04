interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyHours: number[], target: number): Result => {  
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter((hour) => hour > 0).length
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength
    const success = average >= target

    const getRating = (average: number, target: number): number => {
        if (average < target * 0.9) return 1;
        if (average < target) return 2;
        if (average >= target) return 3;
        return 0
      }
    
      const getRatingDescription = (rating: number): string => {
        if (rating === 1) {
          return "Get yo ass up";
        }
        if (rating === 2) {
          return "One more";
        }
        if (rating === 3) {
          return "Good";
        }
        return 'error'
      };
    
      const rating = getRating(average, target);
      const ratingDescription = getRatingDescription(rating);
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const target: number = Number(process.argv[2])
const dailyHours: number[] = process.argv.slice(3).map(Number)
console.log(calculateExercises(dailyHours, target));