import React from 'react'
import { useEffect, useState } from 'react';

type Props = {
    selectedAnswer: string;
    id: number;
}

interface Q {
    id:number;
    question:string;
    options:string[];
    correctanswer:number;
}

export default function CheckAnswer({selectedAnswer, id}:Props) {
    const [question, setQuestion] = useState<Q>({id: 0, question:'', options:[''], correctanswer:0});

    useEffect(() => {
        fetch(`https://localhost:5001/api/answers/${id}`)
            .then(response => response.json())
            .then(data => {
                setQuestion(data)
            });            
    }, [id]);

    if (!selectedAnswer) {
        return (
                <p className='q-null'>Please select an answer.</p> 
        )  
    }

    if (selectedAnswer === question.options[question.correctanswer]) {
        return (
                <p className='correct'>Correct!</p>
        )
    }
    else{
        return (
                <p className='incorrect'>Incorrect, please try again.</p> 
        )
    }

}
