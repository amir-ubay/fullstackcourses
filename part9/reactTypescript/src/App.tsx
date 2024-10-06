import { useEffect, useState } from "react";
import { getDiaries, createDiary } from "./services/diaries";
import { NewDiaryEntry, Diary } from "./types";
import { Weather, Visibility } from "./types";

const App = () => {
  const initialState = {
    date: "",
    weather: Weather.Rainy,
    visibility: Visibility.Good,
    comment: "",
  };
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>(initialState);
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const eventInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDiary(newDiary).then((data) => setDiaries([...diaries, data]));
    setNewDiary(initialState);
  };

  useEffect(() => {
    getDiaries().then((data) => setDiaries(data));
  }, []);
  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>date</label>
          <input
            type="date"
            name="date"
            onChange={eventInput}
            value={newDiary.date}
          />
        </div>
        <div>
          <label>visibility</label>
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={eventInput}
          />{" "}
          Great
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={eventInput}
          />{" "}
          Good
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={eventInput}
          />{" "}
          Ok
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={eventInput}
          />{" "}
          Poor
        </div>
        <div>
          <label>weather</label>
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={eventInput}
          />{" "}
          Sunny
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={eventInput}
          />{" "}
          Rainy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={eventInput}
          />{" "}
          Cloudy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={eventInput}
          />{" "}
          Stormy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={eventInput}
          />{" "}
          Windy
        </div>
        <div>
          <label>comment</label>
          <input
            type="text"
            name="comment"
            onChange={eventInput}
            value={newDiary.comment}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Diary Entries</h2>
      {/* Display Diary Entries */}
      <div>
        {diaries.map((diary: Diary) => (
          <>
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
