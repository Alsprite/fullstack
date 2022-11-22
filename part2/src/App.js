const Header = (props) => {
  console.log(props.courses)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part p={props.p[0].name} e={props.p[0].exercises}/>
      <Part p={props.p[1].name} e={props.p[1].exercises}/>
      <Part p={props.p[2].name} e={props.p[2].exercises}/>
      <Part p={props.p[3].name} e={props.p[3].exercises}/>
    </div>
  )
}
const Part = (props) => {
  return (
    <p>{props.p} {props.e}</p>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Total of {props.p[0].exercises + props.p[1].exercises + props.p[2].exercises + props.p[3].exercises} exercises</p>
    </div>
  )
}
const Course = (props) => {
  return (
    <div>
      <Header course={props.courses[0][0].name} />
      <Content p={props.courses[0][0].parts} />
      <Total p={props.courses[0][0].parts} />
      <Header course={props.courses[0][1].name} />
      {/* <Content p={props.courses[0][1].parts} /> */}
    </div>
  )
}
const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={[courses]}/>
    </div>
  )
}

export default App