import React from 'react';
import {useNavigate} from "react-router-dom";
import {dummy} from "../quizDummy";

function QuizCreateButton() {

    const navigate = useNavigate();
    const onClickQuizCreate = () => {
        navigate(`/quizzes/create`)
    }



    return (
        <div className={'quiz-create'} onClick={onClickQuizCreate}>
            quizCreate
            퀴즈 만들기
        </div>
    );
}

export default QuizCreateButton;