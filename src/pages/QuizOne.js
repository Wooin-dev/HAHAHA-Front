import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import QuizThumb from "../components/QuizThumb";
import ReplyOne from "../components/ReplyOne";
import ReplySubmit from "../components/ReplySubmit";

function QuizOne() {

    const navigate = useNavigate();

    const {id} = useParams();
    const [quiz, setQuiz] = useState({});
    const [replies, setReplies] = useState([]);
    const answer = quiz.answer;

    const [answerIn, setAnswerIn] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [solved, setSolved] = useState(false);

    //데이터 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/quizzes/${id}`).then(res => {
            setQuiz(res.data)
            setReplies(res.data.replies);
        }).catch(error => {
            alert(error)
        })
    }, [])

    const clickShowHint = () => {
        setShowHint(true);
    }

    const checkAnswer = () => {
        if (answerIn === answer) {
            alert(`정답 ${answer}`)
            setSolved(true);
        } else {
            alert('땡!')
        }
    }
    const goToModify = () => {
        navigate(`/quizzes/modify/${id}`, {
            state: quiz
        })
    }
    const deleteQuiz = () => {
        axios.delete(`http://localhost:8080/api/quizzes/${id}`, {
            withCredentials: true
        }).then(() => {
            navigate('/quizzes');
        }).catch(error => {
            console.log(error);
            navigate('/quizzes');
        })
    };

    const submitReplyHandler = (writingReply) => {

        axios.post(`http://localhost:8080/api/quizzes/${id}/replies`,
            {
                contents: writingReply,
            }, {
                withCredentials: true,
            }
        ).then(res => {
            addReply(res.data);
        })
    }

    const addReply = (newReply) => {
        const updatedReplies = [...replies, newReply];
        setReplies(updatedReplies);
    }


    return (
        <div className="p-3 mx-auto w-[600px]">
            <div className="border-2 p-5">
                <div className="text-xs mb-2">
                    Quiz. {id}
                </div>
                <div id='quiz-title'
                     className="text-3xl mb-4">
                    {quiz.question}
                </div>
                <div id="hint" className="flex items-center space-x-2 mb-5">
                    <button className="text-[12px] text-gray-500 p-1 px-2 border-[1px] border-b-2 border-gray-300 "
                            onClick={clickShowHint}>
                        힌트 주세요!
                    </button>
                    <div id='quiz-hint'
                         className="text-sm ">
                        {showHint && <div>{quiz.hint}</div>}
                    </div>
                </div>
                <div id="answer-input description"
                     className="bg-gray-100 py-4 my-8">
                    <div className="flex flex-col items-center">
                        <p className="text-sm ml-1 mb-2">그거슨..</p>
                        <div className="space-x-2">
                            <span className="text-lg font-bold">'</span>
                            <input
                                className="w-[200px] p-2 mb-3 text-center font-bold placeholder:text-gray-300 rounded-sm"
                                type='text'
                                value={answerIn}
                                placeholder={'음...'}
                                onChange={(e) => {
                                    setAnswerIn(e.target.value)
                                }}/>
                            <span className="text-lg font-bold">'</span>
                        </div>
                        <button onClick={checkAnswer}
                                className="text-white bg-gray-800 p-1 px-4 rounded-2xl border-b-[3px] border-b-gray-500 cursor-pointer">
                            아닌가요?
                        </button>
                    </div>
                    <div id='quiz-description'
                         className="flex flex-col items-center">
                        {solved && <div className="py-7 mt-2 text-center">
                            <p className="text-sm font-bold ml-2">왜냐하면~</p>
                            <div>{quiz.description}</div>
                        </div>}
                    </div>
                </div>
                <div id="btns"
                     className="space-x-2 flex justify-end">

                    <button onClick={goToModify}
                            className="text-xs p-1.5 bg-gray-500 text-white rounded-xl">수정
                    </button>
                    <button onClick={deleteQuiz}
                            className="text-xs p-1 border-[1px] border-gray-400 text-gray-400 rounded-xl">삭제
                    </button>
                </div>
            </div>

            <div id='quiz-reply-container'
                 className="bg-gray-100 p-5">
                <div id='quiz-reply-submit'
                     className="py-2 mb-3">
                    <ReplySubmit quizId={id} onClickHandler={submitReplyHandler}/>
                </div>
                <div id='quiz-reply-list'
                     className="p-4 space-y-6">
                    {
                        replies.map(reply => {
                            return (
                                <ReplyOne key={reply['id']}
                                          contents={reply['contents']}
                                          author={reply['author']}
                                          createdAt={reply['createdAt']}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}


export default QuizOne;