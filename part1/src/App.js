

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
      <p>{props.p} {props.e}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part p={props.p[0].name} e={props.p[0].exercises} />
      <Part p={props.p[1].name} e={props.p[1].exercises} />
      <Part p={props.p[2].name} e={props.p[2].exercises} />
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.p[0].exercises + props.p[1].exercises + props.p[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
    return (
      <div>
        <Header course = {course} />
        <Content p = {parts} />
        <Total p = {parts} />
      </div>
    )
  }

export default App