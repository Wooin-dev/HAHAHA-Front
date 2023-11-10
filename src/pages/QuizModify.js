import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Title from "../components/Title";
import {API_QUIZ_BASE} from "../constants/uri";

function QuizModify() {

    const navigate = useNavigate();

    const {id} = useParams();
    const {state} = useLocation();

    const [question, setQuestion] = useState(state.question)
    const [hint, setHint] = useState(state.hint)
    const [answer, setAnswer] = useState(state.answer)
    const [description, setDescription] = useState(state.description)



    function modifyQuiz() {

        const modifiedQuiz = {...state}

        modifiedQuiz.question = question;
        modifiedQuiz.hint = hint;
        modifiedQuiz.answer = answer;
        modifiedQuiz.description = description;

        axios.put(`${API_QUIZ_BASE}/${id}`, modifiedQuiz, {
            withCredentials: true
        })
            .then((res) => {
                console.log('put메소드 then');
                navigate(`/quizzes/${id}`, {state:modifiedQuiz});
            })
            .catch((error) => {
                console.log(error)
            })


    }


    return (
        <div className='page-container'>
            <Title title="유-우머 만들기" subtitle="어디 보쟈하~"/>

            <div className="w-[600px] mx-auto border-2 space-y-2 mt-8 p-16">

                <div className="border-[1px] p-3 rounded-lg">
                    <p className="text-sm font-bold mb-1">퀴즈</p>
                    <textarea name="question" placeholder=" ~~인 것은?!" value={question}
                              className="w-full h-20 resize-none"
                              onChange={(e) => {
                                  setQuestion(e.target.value)
                              }}/>
                </div>
                <div className="border-[1px] p-3 rounded-lg">
                    <p className="text-sm font-bold mb-1">힌트</p>
                    <textarea name="hint" placeholder="힌트" value={hint}
                              className="w-full h-10 resize-none"
                              onChange={(e) => {
                                  setHint(e.target.value)
                              }}/>
                </div>
                <div className="border-[1px] p-3 rounded-lg">
                    <p className="text-sm font-bold mb-1">정답</p>
                    <input type="text" name="answer" placeholder="정답" value={answer}
                           onChange={(e) => {
                               setAnswer(e.target.value)
                           }}/>
                </div>
                <div className="border-[1px] p-3 rounded-lg">
                    <p className="text-sm font-bold mb-1">설명</p>
                    <textarea name="description" placeholder="~~는 ~~~니까! 으엌ㅋㅋㅋㅋㅋ" value={description}
                              className="w-full h-16 resize-none"
                              onChange={(e) => {
                                  setDescription(e.target.value)
                              }}/>
                </div>
                <div className="ml-auto mr-auto">
                    <button className="text-white bg-gray-900 rounded-lg p-2 mr-0 ml-auto block"
                            onClick={e => {
                                e.preventDefault();
                                modifyQuiz();
                            }}>
                        유-우머 수정하기
                    </button>
                </div>
            </div>
        </div>
    );
}


export default QuizModify;