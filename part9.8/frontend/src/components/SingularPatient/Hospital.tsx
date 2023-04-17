const Hospital = (props: any) => {
    const entry = props.entry
    
    return (
        <div style={{outline: '2px solid black'}}>
            <p>{entry.date} </p>
            <i>{entry.description}</i>
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
}

export default Hospital