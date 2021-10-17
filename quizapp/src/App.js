import './App.css';
import GetQuestions from './Components/GetQuestions';
import { useState } from 'react';
import AddQuestion from './Components/AddQuestion';

function App() {
  const [all, setAll] = useState(false)
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <div className='header'>
        <h1>Welcome to the Trivia Quiz App</h1>
        <h2>Created by Andrew Hudson</h2>
        <button className="btn" onClick={() => setAll(true)}>All Questions</button>
        <button className="btn" onClick={() => setAll(false)}>10 Random Questions</button>
        <button className="btn" onClick={() => setShow(true)}>Want to add a question of your own? Click here!</button>
      </div>
      <div className="container">
        <GetQuestions all={all} />
        <AddQuestion show={show} onClose={() => setShow(false)}/>
      </div>
    </div>
  );
}

export default App;
