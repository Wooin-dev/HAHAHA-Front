import React, {useState} from 'react';
import {dummy} from "../quizDummy";
import axios from "axios";
import {useParams} from "react-router-dom";

function QuizModify(props) {

    const {id} = useParams()

    return (
        <div className={'page-container'}>
            <h2>Quiz Modify</h2>
            <form onSubmit={e => {
                e.preventDefault();

                const title = e.target.title.value;
                const hint = e.target.hint.value;
                const answer = e.target.answer.value;
                const description = e.target.description.value;

                modifyQuiz(id, title, hint, answer, description);

            }}>
                <p><textarea name="title" placeholder="문제"/></p>
                <p><textarea name="hint" placeholder="힌트"/></p>
                <p><input type="text" name="answer" placeholder="정답"/></p>
                <p><textarea name="description" placeholder="설명"/></p>
                <p><input type="submit" value="퀴즈 등록하기"/></p>
            </form>
        </div>
    );
}


function modifyQuiz(_quizId, _question, _hint, _answer, _description) {

    axios.put(`http://localhost:8080/api/quizzes/${_quizId}`, {
        question: _question,
        hint: _hint,
        answer: _answer,
        description: _description
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })

}


export default QuizModify;