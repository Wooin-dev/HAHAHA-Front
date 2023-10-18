import React from 'react';
import axios from "axios";
import {useNavigate, RedirectFunction} from "react-router-dom";

function QuizCreate(props) {

    const navigate = useNavigate();

    function createQuizOnList(_question, _hint, _answer, _description) {

    axios.post('http://localhost:8080/api/quizzes', {
        question: _question,
        hint: _hint,
        answer: _answer,
        description: _description
    },{
        withCredentials: true
    }).then((res) => {
        console.log(res);
        navigate('/quizzes');
    }).catch((error) => {
        console.log('get error');
        console.log(error);
    })

}
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





export default QuizCreate;