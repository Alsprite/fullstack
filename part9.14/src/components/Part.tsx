import { CoursePart } from '../types'

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic": 
        return (
            <div>
                <i>{part.description}</i>
            </div>
        )
        case "group":
        return (
            <div>
                project exercises {part.groupProjectCount}
            </div>
        )
        case "background":
        return (
            <div>
                <i>{part.description}</i>
                <br></br>
                <p>submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
            </div>
        )
        case "special":
        return (
            <div>
                <i>{part.description}</i>
                <p>required skills: {part.requirements.map((skill) => skill).join(", ")}</p>
            </div>
        )
    }
}

export default Part