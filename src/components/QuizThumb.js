import React from "react";
import {useNavigate} from "react-router-dom";

export default function QuizThumb(props) {

    const navigate = useNavigate();
    const onClickQuizItem = () => {
        navigate(`/quizzes/${props.id}`, {
            state: props
        })
    }

    return (
        <div className='quiz-thumb-container' onClick={onClickQuizItem}>
            <div className='quiz-info'>
                <span>Quiz. {props.id}</span>
                <h3>{props.question}</h3>
            </div>
        </div>
    )
}