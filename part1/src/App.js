

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}
const Content = () => {
  return (
    <div>
      <p>
      </p>
    </div>
  )
}
const Total = (props) => {

  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}
const App = () => {
  // const-määrittelyt
  const props = {
    course: "Half Stack application development",
    part1: "Fundamentals of React",
    exercises1: 10,
    part2: "Using props to pass data",
    exercises2: 7,
    part3: "State of a component",
    exercises3: 14
  }

  return (
    <div>
      <Header course={props.course} />
      <Content />
      <Total />
    </div>
  )
}

export default App