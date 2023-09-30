import React from 'react';
import {useNavigate} from "react-router-dom";
import {dummy} from "../quizDummy";

function QuizCreateButton() {

    const navigate = useNavigate();
    const onClickQuizCreate = (ddd) => {
        navigate(`/quiz/create`)
    }

    const createQuiz = () => {
        dummy.push()
    }

    return (
        <div className={'quiz-create'} onClick={onClickQuizCreate}>
            quizCreate
            퀴즈 만들기
            <button onClick={()=>createQuiz}/>
        </div>
    );
}

export default QuizCreateButton;