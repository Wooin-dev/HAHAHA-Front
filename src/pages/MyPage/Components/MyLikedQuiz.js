import React from 'react';
import {API_MYPAGE_BASE} from "../../../constants/uri";
import QuizListPage from "../../QuizListPage/QuizListPage";

function MyLikedQuiz() {
    return (
        <div>
            <h3 className="text-center text-xl font-bold pt-14">내가 푸하하한 유-우머</h3>
            <h5 className="text-center text-gray-600 p-3 mb-5">입꼬리가 올라가 버렸다는 뜻</h5>
            <QuizListPage uri={`${API_MYPAGE_BASE}/my-quizzes/liked`} size={10} sortBy="createdAt" isAsc={false}/>
        </div>
    );
}

export default MyLikedQuiz;