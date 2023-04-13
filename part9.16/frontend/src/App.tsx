import { useState, useEffect } from 'react'
import axios from 'axios'
import { Weather, Visibility } from './types'

interface Diary {
  id: number,
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data as Diary[])
    })
  }, [])

const addDiary = (event: React.SyntheticEvent) => {
  event.preventDefault()
  const newThing = {
    id: diaries.length + 1,
    date,
    weather: weather as Weather,
    visibility: visibility as Visibility,
    comment
  }
  console.log(newThing)
  if (newThing.date === '') {
    setErrorMessage('Error: Date not given')
    setTimeout(() => {
      setErrorMessage('')
    }, 2000)
  }
  axios.post<Diary>('http://localhost:3001/api/diaries', newThing).then(response => {
    setDiaries([...diaries, newThing])
  })
  setDate('')
  setVisibility(Visibility.Great)
  setWeather(Weather.Sunny)
  setComment('')
}

const errorStyle = {
  color: "red"
}

  return (
    <div className="App">
      <h1>Add new entry</h1>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
      <form onSubmit={addDiary}>
        <label htmlFor="date">date</label>
        <input id="date" type="date" value={date} onChange={({ target }) => setDate(target.value)}></input>
        <br></br>
          <legend>visibility</legend>
          <label htmlFor="great">great</label>
          <input type="radio" id="great"></input>
          <label htmlFor="good">good</label>
          <input type="radio" id="good"></input>
          <label htmlFor="ok">ok</label>
          <input type="radio" id="ok"></input>
          <label htmlFor="poor">poor</label>
          <input type="radio" id="poor"></input>
        <br></br>
        <legend>weather</legend>
        <label htmlFor="sunny">sunny</label>
        <input type="radio" id="sunny"></input>
        <label htmlFor="rainy">rainy</label>
        <input type="radio" id="rainy"></input>
        <label htmlFor="cloudy">cloudy</label>
        <input type="radio" id="cloudy"></input>
        <label htmlFor="stormy">stormy</label>
        <input type="radio" id="stormy"></input>
        <label htmlFor="windy">windy</label>
        <input type="radio" id="windy"></input>
        <br></br>
        <label htmlFor="comment">comment</label>
        <input id="comment" value={comment} onChange={({ target }) => setComment(target.value)}></input>
        <br></br>
        <button type="submit">add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
}

export default App;