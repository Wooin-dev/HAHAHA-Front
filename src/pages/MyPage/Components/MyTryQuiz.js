import React from 'react';
import {API_MYPAGE_BASE} from "../../../constants/uri";
import QuizListPage from "../../QuizListPage/QuizListPage";

function MyTryQuiz() {
    return (
        <div>
            <h3 className="text-center text-xl font-bold pt-14">내가 도전한 유-우머</h3>
            <h5 className="text-center text-gray-600 p-3 mb-5">아직 못 풀었다는 뜻</h5>
            <QuizListPage uri={`${API_MYPAGE_BASE}/my-quizzes/try`} size={10} sortBy="createdAt" isAsc={false}/>
        </div>
    );
}

export default MyTryQuiz;