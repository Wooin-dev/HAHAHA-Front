import React, {useState} from 'react';
import {useLocation, useParams} from "react-router-dom";

function QuizSelect(props) {

    const {id} = useParams();
    const {state} = useLocation();

    const answer = state.answer;
    const [answerIn, setAnswerIn] = useState('');
    const [showHint, setShowHint] = useState(false);


    const clickShowHint = () => {
        setShowHint(!showHint);
    }

    const checkAnswer = (answerIn) => {
        if (answerIn === answer) {
            alert('정답')
        } else {
            alert('땡!')
        }
    }

    const testclick = (msg) => alert(`hello, ${msg}`)

    return (
        <div className='page-container'>
            <div className='quiz-select-container'>
                <div className='quiz-id'>{id}</div>
                <div className='quiz-title'>{state.title}</div>
                <div className='show-hint' style={{display:"flex"}}>
                    <button onClick={clickShowHint}>힌트보기</button>
                    <div className='quiz-hint'>
                        {showHint&&<div>{state.hint}</div>}
                    </div>
                </div>
            </div>
            <div>
                <input type='text'
                       value={answerIn}
                       onChange={(e) => {
                    setAnswerIn(e.target.value)
                }}/>
                <button onClick={answerIn => checkAnswer(answerIn)}>정답확인</button>

            </div>
        </div>
    );
}


export default QuizSelect;