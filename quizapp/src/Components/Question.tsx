import React from 'react'
import { useState } from 'react';
import CheckAnswer from './CheckAnswer';
import '../App.css'

interface Q {
  id:number;
  question:string;
  options:string[];
}

export default function Question({q}:{q:Q}) {
    const [chosen, setChosen] = useState('');
    const [flip, setFlip] = useState(false);
    const question = q;

  return (
    <div className={`question-block ${flip ? 'flip' : ''}`}>
      <div className='front'>
        {q.question}
        <form className='question-answers'>
        {question.options.map(option => (
          <div key={option} className="radio">
            <label className='q-option'>
              <input type="radio" 
                  value={option} 
                  checked={chosen === option}
                  onClick={() => setChosen(option)}
                  
                  />{option}
            </label>
          </div>
        ))}
        </form>
        {!!chosen && 
        <button className='submit' onClick={() => setFlip(!flip)}>Check Answer</button>}
      </div>
      <div className='back'>
          {!!chosen && <CheckAnswer selectedAnswer={chosen} id={q.id}/>}
        <button className='submit' onClick={() => setFlip(!flip)}>Back</button>
      </div>
    </div>

  );
};
