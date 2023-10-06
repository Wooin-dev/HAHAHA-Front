import React, {useState} from 'react';
import {dummy} from "../quizDummy";
import axios from "axios";

function QuizCreate(props) {
    return (
        <div className={'page-container'}>
            <h2>Quiz Create</h2>
            <form onSubmit={e => {
                e.preventDefault();

                const title = e.target.title.value;
                const hint = e.target.hint.value;
                const answer = e.target.answer.value;
                const description = e.target.description.value;

                createQuizOnList(title, hint, answer, description);

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


function createQuizOnList(_question, _hint, _answer, _description) {

    axios.post('http://localhost:8080/api/quizzes', {
        question: _question,
        hint: _hint,
        answer: _answer,
        description: _description
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error)
    })

}


export default QuizCreate;