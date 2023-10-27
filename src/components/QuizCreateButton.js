import React from 'react';
import {useNavigate} from "react-router-dom";
import {dummy} from "../quizDummy";

function QuizCreateButton() {

    const navigate = useNavigate();
    const onClickQuizCreate = () => {
        navigate(`/quizzes/create`)
    }


    return (
        <div className="
        w-[100px] m-auto py-1.5
        text-sm text-white font-bold text-center

        bg-blue-500 hover:bg-blue-700 ease-out duration-300
        rounded-full shadow

        cursor-pointer

        " onClick={onClickQuizCreate}>
            퀴즈 만들기
        </div>
    );
}

export default QuizCreateButton;