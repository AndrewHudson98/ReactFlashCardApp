import React, { useState } from "react"
import '../App.css'
import Question from "./Question";

type Props = {
    show: boolean;
    onClose: () => void;
}

interface Question {
    question: string;
    option0: string;
    option1: string;
    option2: string;
    option3: string;
    correctanswer: number;
}

function PostToAPI(data: Question) {
    return fetch("https://localhost:5001/api/quizquestions", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
            console.log(response);
            window.location.reload();
        } else {
            console.log('Somthing happened wrong');
        }
    }).catch(err => err);
}

export default function AddQuestion(props: Props) {

    const [question, setQuestion] = useState<Question>({
        correctanswer: 0,
        option0: '',
        option1: '',
        option2: '',
        option3: '',
        question: ''
    });

    if (!props.show) {
        return null
    }
    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h4 className='modal-title'>Add a question here:</h4>
                </div>
                <div className='modal-body'>
                    <form autoComplete='off'>
                        <label className='enter-question'>
                            Question: <input
                                type='text'
                                name='question'
                                required={true}
                                onBlur={e => setQuestion({
                                    ...question,
                                    question: e.target.value
                                })}
                            />
                        </label>
                        <label className='enter-options'>
                            <label className='optioninput'>
                                Option 1: <input
                                    type='text'
                                    name='textoption0'
                                    required={true}
                                    className='optiontext'
                                    onBlur={e => setQuestion({
                                        ...question,
                                        option0: e.target.value
                                    })}
                                />
                            </label>
                            <label className='optioninput'>
                                Option 2: <input
                                    type='text'
                                    name='textoption1'
                                    className='optiontext'
                                    required={true}
                                    onBlur={e => setQuestion({
                                        ...question,
                                        option1: e.target.value
                                    })}
                                />
                            </label>
                            <label className='optioninput'>
                                Option 3: <input
                                    type='text'
                                    name='textoption2'
                                    className='optiontext'
                                    required={true}
                                    onBlur={e => setQuestion({
                                        ...question,
                                        option2: e.target.value
                                    })}
                                />
                            </label>
                            <label className='optioninput'>
                                Option 4: <input
                                    type='text'
                                    name='textoption3'
                                    className='optiontext'
                                    required={true}
                                    onBlur={e => setQuestion({
                                        ...question,
                                        option3: e.target.value
                                    })}
                                />
                            </label>
                        </label>
                        <label>
                            Correct option:
                            <input
                                type='radio'
                                name='option0'
                                className='optionradio'
                                checked={question.correctanswer === 0}
                                onClick={() => setQuestion({
                                    ...question,
                                    correctanswer: 0
                                })}
                            />Option 1
                            <input
                                type='radio'
                                name='option0'
                                className='optionradio'
                                checked={question.correctanswer === 1}
                                onClick={() => setQuestion({
                                    ...question,
                                    correctanswer: 1
                                })}
                            />Option 2
                            <input
                                type='radio'
                                name='option0'
                                className='optionradio'
                                checked={question.correctanswer === 2}
                                onClick={() => setQuestion({
                                    ...question,
                                    correctanswer: 2
                                })}
                            />Option 3
                            <input
                                type='radio'
                                name='option0'
                                className='optionradio'
                                checked={question.correctanswer === 3}
                                onClick={() => setQuestion({
                                    ...question,
                                    correctanswer: 3
                                })}
                            />Option 4
                        </label>
                        <label className='form-bottom'>
                            <button className='submission-btn' onClick={() => PostToAPI(question)}>Submit Question</button>
                            <button onClick={props.onClose} className='close-btn'>Close Popup</button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}
