const Header = (props) => {
  let course = props.course;
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part p={props.p[0].name} e={props.p[0].exercises}/>
      <Part p={props.p[1].name} e={props.p[1].exercises}/>
      <Part p={props.p[2].name} e={props.p[2].exercises}/>
    </div>
  )
}
const Part = (props) => {
  return (
    <p>{props.p} {props.e}</p>
  )
}
const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content p={props.course.parts} />
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App