import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ReplyOne from "./ReplyOne";
import ReplySubmit from "./ReplySubmit";
import {API_LIKE_BASE, API_QUIZ_BASE, API_QUIZ_USER_DATA_BASE, API_REPLY_BASE} from "../../constants/uri";
import HeartLike from "./heartLike";
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";

function QuizOne() {

    const navigate = useNavigate();

    const {id} = useParams();
    const modifiedQuiz = useLocation().state;

    const isLogin = useRecoilValue(isLoginSelector);

    const [quiz, setQuiz] = useState({});
    const [replies, setReplies] = useState([]);
    const [quizUserData, setQuizUserData] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [solved, setSolved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [answerIn, setAnswerIn] = useState('');

    const userInfoLocal = JSON.parse(localStorage.getItem('user-info'));


    //데이터 가져오기
    useEffect(() => {

        if (modifiedQuiz !== null) {
            setQuiz(modifiedQuiz);
            setReplies(modifiedQuiz.replies);
        } else {
            axios.get(`${API_QUIZ_BASE}/${id}`).then(res => {
                setQuiz(res.data)
                setReplies(res.data.replies);
            }).catch(error => {
                alert(error)
            });
        }

        if (isLogin) {

            axios.get(`${API_QUIZ_USER_DATA_BASE}/show-quiz/${id}`, {
                withCredentials: true
            }).then(res => {
                setQuizUserData(res.data);
                setIsLiked(res.data.isLiked);
            })
        }

    }, [isLogin]);


    useEffect(() => {
        if (quizUserData.isShowHint) setShowHint(true);
    }, [quizUserData])

    const clickShowHint = () => {
        setShowHint(true);

        if (isLogin && !quizUserData.isShowHint) {
            axios.get(`${API_QUIZ_USER_DATA_BASE}/show-hint/${id}`, {
                withCredentials: true
            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }
    }

    const checkAnswer = () => {
        if (answerIn === quiz.answer) {
            alert(`정답 ${quiz.answer}`)
            setSolved(true);

            if (isLogin && !quizUserData.isSolved) {
                axios.get(`${API_QUIZ_USER_DATA_BASE}/solve-quiz/${id}`, {
                    withCredentials: true
                }).then(res => {
                    console.log(res);
                }).catch(err => console.log(err));
            }

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

        const result = window.confirm("선택한 유-우머를 삭제하시겠습니까?");
        if (result) {
            axios.delete(`${API_QUIZ_BASE}/${id}`, {
                withCredentials: true
            }).then(() => {
                navigate('/quizzes');
            }).catch(error => {
                console.log(error);
                navigate('/quizzes');
            })
        }
    };

    const submitReplyHandler = (writingReply) => {

        axios.post(`${API_QUIZ_BASE}/${id}/replies`,
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

    const deleteReply = (replyId) => {

        const result = window.confirm("선택한 댓글을 삭제하시겠습니까?");
        if (result) {
            axios.delete(`${API_REPLY_BASE}/${replyId}`, {
                withCredentials: true
            }).then(() => {
                const newReplies = []
                replies.map(reply => {
                    if (reply.id !== replyId) {
                        newReplies.push(reply);
                    }
                });
                setReplies(newReplies);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const clickLikeHandler = () => {

        if (isLogin) {
            if (isLiked) {
                cancleLike();
            } else {
                doLike();
            }
        } else {
            alert("로그인이 필요한 기능입니다.");
        }
    }

    const doLike = () => {
        axios.get(`${API_LIKE_BASE}/quizzes/${id}/do-like`, {
            withCredentials: true
        }).then(res => {
            setIsLiked(true);
            quiz.likesCnt += 1;
        }).catch(err => {
            console.log(err);
        })
    }

    const cancleLike = () => {
        axios.get(`${API_LIKE_BASE}/quizzes/${id}/cancle-like`, {
            withCredentials: true
        }).then(res => {
            setIsLiked(false);
            quiz.likesCnt -= 1;
        }).catch(err => {
            console.log(err);
        })
    }

    const BtnRow = () => {
        if (userInfoLocal) {
            if (userInfoLocal.id === quiz.authorId) {
                return (
                    <div id="btns"
                         className="space-x-2 flex justify-end">

                        <button onClick={goToModify}
                                className="text-xs p-1.5 bg-gray-500 text-white rounded-xl">수정
                        </button>
                        <button onClick={deleteQuiz}
                                className="text-xs p-1 border-[1px] border-gray-400 text-gray-400 rounded-xl">삭제
                        </button>
                    </div>
                )
            }
        }
    }

    const DevStatus = () => {
        return (
            <div className={`${process.env.REACT_APP_TRUE_ONLY_ON_LOCAL !== "true" && "hidden"}`}>
                {JSON.stringify(quizUserData)}
                {isLiked ? "true" : "false"}
            </div>
        )
    }

    return (
        <div className="p-3 mx-auto w-[600px]">
            <DevStatus/>
            <div className="border-2 p-5">
                <div className=" mb-2 flex justify-between">
                    <div className="text-xs"> Quiz. {id} </div>
                    <div className="text-sm mr-4"><span className="text-xs">by.</span> {quiz.author} </div>
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
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        checkAnswer();
                                    }
                                }}
                                onChange={(e) => {
                                    setAnswerIn(e.target.value);

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
                            <div className="mx-3">{quiz.description}</div>
                        </div>}
                    </div>
                </div>
                <HeartLike isLiked={isLiked} likeCnt={quiz.likesCnt} onClickHandler={clickLikeHandler}/>
                <BtnRow/>
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
                                          id={reply['id']}
                                          contents={reply['contents']}
                                          author={reply['author']}
                                          authorId={reply['authorId']}
                                          createdAt={reply['createdAt']}
                                          likesCnt={reply['likesCnt']}
                                          deleteOnClick={deleteReply}
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