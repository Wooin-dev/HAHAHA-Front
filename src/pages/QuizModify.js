import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function QuizModify() {

    const navigate = useNavigate();

    const {id} = useParams();
    const {state} = useLocation();

    const [question, setQuestion] = useState(state.question)
    const [hint, setHint] = useState(state.hint)
    const [answer, setAnswer] = useState(state.answer)
    const [description, setDescription ] = useState(state.description)

    function modifyQuiz(_quizId, _question, _hint, _answer, _description) {

        const modifiedQuiz = {
            question: _question,
            hint: _hint,
            answer: _answer,
            description: _description
        }

        axios.put(`http://localhost:8080/api/quizzes/${_quizId}`, modifiedQuiz )
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })

        navigate(`/quiz/${_quizId}`, {
            state: modifiedQuiz
        });
    }



    return (
        <div className={'page-container'}>
            <h2>Quiz Modify</h2>
            <form onSubmit={e => {
                e.preventDefault();



                setAnswer(e.target.answer.value);
                setDescription(e.target.description.value);

                modifyQuiz(id, question, hint, answer, description);

            }}>
                <p><textarea name="question" placeholder="문제"
                             value={question} onChange={(e)=> {setQuestion(e.target.value);}}/></p>
                <p><textarea name="hint" placeholder="힌트"
                             value={hint} onChange={e => setHint(e.target.value)}/></p>
                <p><input type="text" name="answer" placeholder="정답"
                          value={answer} onChange={e => setAnswer(e.target.value)}/></p>
                <p><textarea name="description" placeholder="설명"
                             value={description} onChange={e => setDescription(e.target.value)}/></p>
                <p><input type="submit" value="퀴즈 수정하기"/></p>
            </form>
        </div>
    );
}





export default QuizModify;