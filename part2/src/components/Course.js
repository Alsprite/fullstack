const Header = (props) => {
    return (
      <h2>{props.name}</h2>
    )
  }
  const Content = (props) => {
    return (
      <div>
        { props.parts.map( part => <p key={ part.id }>{ part.name } { part.exercises }</p> ) }
      </div>
    )
  }
  const Total = (props) => {
    return (
      <div>
        <p><b>total of {props.parts.reduce((acc,cur) => acc + cur.exercises, 0 )} exercises</b></p>
      </div>
    )
  }
  const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }
  
export default Course