

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
const Total = ({exercises1, exercises2, exercises3}) => {

  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}
const App = () => {
  // const-määrittelyt
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App