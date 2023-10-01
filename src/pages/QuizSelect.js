import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function QuizSelect() {

    const navigate = useNavigate();

    const {id} = useParams();
    const {state} = useLocation();
    const answer = state.answer;

    const [answerIn, setAnswerIn] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [solved, setSolved] = useState(false);


    const clickShowHint = () => {
        setShowHint(!showHint);
    }

    const checkAnswer = () => {
        if (answerIn === answer) {
            alert(`정답 ${answer}`)
            setSolved(true);
        } else {
            alert('땡!')
        }
    }
    const goToModify = () => {
        navigate(`/quiz/modify/${id}`, {
            state: state
        })
    }
    const deleteQuiz = () => {
        axios.delete(`http://localhost:8080/api/quizzes/${id}`)
        navigate('/quiz')
    };


    return (
        <div className='page-container'>
            <div className='quiz-select-container'>
                <div className='quiz-id'>{id}</div>
                <div className='quiz-title'>{state.question}</div>
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
                <button onClick={checkAnswer}>정답확인</button>
                <div className='quiz-description'>
                    {solved&&<div>{state.description}</div>}
                </div>

                <button onClick={goToModify}>수정</button>
                <button onClick={deleteQuiz}>삭제</button>

            </div>
        </div>
    );
}


export default QuizSelect;