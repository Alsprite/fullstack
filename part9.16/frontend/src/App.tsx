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
  axios.post<Diary>('http://localhost:3001/api/diaries', newThing).then(response => {
    setDiaries([...diaries, newThing])
  })
  setDate('')
  setVisibility(Visibility.Great)
  setWeather(Weather.Sunny)
  setComment('')
}
 
  return (
    <div className="App">
      <h1>Add new entry</h1>
      <form onSubmit={addDiary}>
        <label htmlFor="date">date</label>
        <input id="date" value={date} onChange={({ target }) => setDate(target.value)}></input>
        <br></br>
        <label htmlFor="visibility">visibility</label>
        <input id="visibility" value={visibility} onChange={({ target }) => setVisibility(target.value as Visibility)}></input>
        <br></br>
        <label htmlFor="weather">weather</label>
        <input id="weather" value={weather} onChange={({ target }) => setWeather(target.value as Weather)}></input>
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