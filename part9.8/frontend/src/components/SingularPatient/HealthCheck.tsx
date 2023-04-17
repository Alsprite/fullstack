import './style.css'
const HealthCheck = (props: any) => {
    const entry = props.entry
    
    const Heart = () => {
        switch (entry.healthCheckRating) {
          case 0:
            return <div id="heart0"></div>;
          case 1:
            return <div id="heart1"></div>;
          case 2:
            return <div id="heart2"></div>;
          case 3:
            return <div id="heart3"></div>;
          default:
            return <div>balls</div>;
        }
      };
    

    return (
        <div style={{outline: '2px solid black'}}>
            <p>{entry.date}</p>
            <i>{entry.description}</i>
            <Heart />
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
}

export default HealthCheck