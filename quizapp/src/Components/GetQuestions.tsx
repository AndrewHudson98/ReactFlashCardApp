import React from 'react'
import Question from './Question'
import { useState, useEffect } from 'react';

interface Q {
    id:number;
    question:string;
    options:string[];
  }


export default function GetQuestions({ all }:{all:boolean}) {
    
    const [questionList, setQuestionList] = useState<Q[]>();

    useEffect(() => {
        fetch("https://localhost:5001/api/quizquestions")
            .then(response => response.json())
            .then(data => {
                setQuestionList(data)
            });            
    }, []);

    if (!questionList) {
        return null; 
    }

    console.log(questionList);
    
    if (all === true) {
        return (
            <div className='quiz'>
                {questionList.map(q => (
                    <Question q={q}/>
                ))}
            </div>
        )
    } else {
        let indices = []    
        for (let i = 0; i < 10; i++) {
            let j = Math.floor(Math.random() * (questionList.length - 0 + 1)) + 0
            indices.push(questionList[j])
        }
        return (
            <div className='quiz'>
                {indices.map(index => (
                    <Question q={index}/>
                ))}
            </div>
        )
    }
}
