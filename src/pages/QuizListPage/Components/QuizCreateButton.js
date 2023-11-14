import React from 'react';
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../../recoil/loginState";

function QuizCreateButton() {

    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginSelector);
    const onClickQuizCreate = () => {
        if (isLogin) {
            navigate(`/quizzes/create`);
        } else {
            alert("로그인이 필요합니다.");
        }
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