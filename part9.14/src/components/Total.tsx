import { CoursePart } from '../types'

const Total = ({ parts }: { parts: CoursePart[]}) => {
    const initialValue = 0
    const total = parts.reduce((accumulator, part) => accumulator + part.exerciseCount, initialValue)
    return (
        <div>
            Total number of exercises: {total}
        </div>
    )
}

export default Total