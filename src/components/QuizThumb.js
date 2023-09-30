import React from "react";
import {useNavigate} from "react-router-dom";

export default function QuizThumb(props) {

    const navigate = useNavigate();
    const onClickQuizItem = () => {
        navigate(`/quiz/${props.id}`, {
            state: props
        })
    }

    return (
        <div className='quiz-thumb-container' onClick={onClickQuizItem}>
            <div className='quiz-info'>
                <span>Quiz. {props.id}</span>
                <h3>{props.title}</h3>
                <br/>힌트 긁어보기⬇
                <h5>{props.hint}</h5>
            </div>
        </div>
    )
}