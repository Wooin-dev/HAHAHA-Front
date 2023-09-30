import React, {useState} from 'react';
import {dummy} from "../quizDummy";

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


function createQuizOnList(_title, _hint, _answer, _description) {

    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);

    const newQuizzes =  [...dummy]
    const newQuiz = {id: nextId, title: _title, hint: _hint}

}


export default QuizCreate;