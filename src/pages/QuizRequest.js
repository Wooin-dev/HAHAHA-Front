import React, {useState} from 'react';
import axios from "axios";
import {useNavigate, RedirectFunction} from "react-router-dom";
import Title from "../components/Title";

function QuizRequest(props) {


    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [hint, setHint] = useState("");
    const [answer, setAnswer] = useState("");
    const [description, setDescription] = useState("");

    function createQuizOnList() {

        axios.post('http://localhost:8080/api/quizzes', {
            question: question,
            hint: hint,
            answer: answer,
            description: description,
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res);
            navigate('/quizzes');
        }).catch((error) => {
            console.log(error);
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
                                createQuizOnList();
                            }}>
                        유-우머 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}


export default QuizRequest;