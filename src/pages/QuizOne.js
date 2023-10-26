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
        setShowHint(!showHint);
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
        <div className='page-container'>
            <div className='quiz-select-container'>
                <div className='quiz-id'>{id}</div>
                <div className='quiz-title'>{quiz.question}</div>
                <div className='show-hint' style={{display: "flex"}}>
                    <button onClick={clickShowHint}>힌트보기</button>
                    <div className='quiz-hint'>
                        {showHint && <div>{quiz.hint}</div>}
                    </div>
                </div>
            </div>
            <div>
                <input type='text'
                       value={answerIn}
                       onChange={(e) => {
                           setAnswerIn(e.target.value)
                       }}/>
                <button onClick={checkAnswer}>정답확인</button>
                <div className='quiz-description'>
                    {solved && <div>{quiz.description}</div>}
                </div>

                <button onClick={goToModify}>수정</button>
                <button onClick={deleteQuiz}>삭제</button>

            </div>
            <div className='quiz-reply-container'>
                <div className='quiz-reply-submit'>
                    <ReplySubmit quizId={id} onClickHandler={submitReplyHandler}/>
                </div>
                <div className='quiz-reply-list'>
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