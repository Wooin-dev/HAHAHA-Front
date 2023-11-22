import React from 'react';
import Title from "../components/Title";
import QuizListPage from "./QuizListPage/QuizListPage";
import {API_QUIZ_BASE} from "../constants/uri";
import UtilBtnLine from "./QuizListPage/Components/UtilBtnLine";

function QuizBoard() {
    return (
        <div>
            <Title title="유-우머" subtitle="부장님의 입꼬리가 씰룩거리는 이유"/>
            <div className="w-[650px] m-auto space-y-4">
                <UtilBtnLine/>
                <QuizListPage uri={API_QUIZ_BASE} size={10} sortBy="createdAt" isAsc={false}/>
            </div>
        </div>
    );
}

export default QuizBoard;