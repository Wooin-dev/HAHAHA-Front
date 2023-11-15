import React, {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector, UserInfoAtom} from "../../recoil/loginState";
import {API_LIKE_BASE, API_REPLY_BASE} from "../../constants/uri";
import axios from "axios";

function ReplyOne(props) {

    const userInfo = useRecoilValue(UserInfoAtom);
    const isLogin = useRecoilValue(isLoginSelector);

    const [replyContents, setReplyContents] = useState(props.contents);
    const [modifyMode, setModifyMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState({cnt: props.likesCnt});

    useEffect(() => {
        if (isLogin) {
            axios.get(`${API_LIKE_BASE}/replies/is-liked/${props.id}`, {
                withCredentials: true
            })
                .then(res => {
                    setIsLiked(res.data);
                }).catch(err => {
                console.log(err);
            }).finally(() => {
                // console.log(`${props.id}번 댓글 좋아요 확인`)
            });
        }
    }, [])


    const modifyReply = () => {

        axios.put(`${API_REPLY_BASE}/${props.id}`, {
            contents: replyContents
        }, {
            withCredentials: true,
        })
            .then(res => {
                alert("댓글이 수정되었습니다.");
            })
            .catch(err => {
                setReplyContents(props.contents);
            })
            .finally(() => {
                setModifyMode(false);
            })

    }


    const CreatedAt = () => {
        return (
            <div className="text-xs text-gray-600">
                {props && props.createdAt && (
                    <div>
                        <p>{props.createdAt.slice(0, 10)} {props.createdAt.slice(11, 19)}</p>
                    </div>
                )}
            </div>
        )
    }

    const ReplyBtns = () => {

        return (
            <>
                {userInfo && props.authorId === userInfo.id && (
                    <div className="text-xs underline text-gray-400 flex space-x-2 items-center">
                        <button onClick={() => setModifyMode(true)}>
                            수정 {modifyMode && "수정모드"}
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            props.deleteOnClick(props.id);
                        }}>
                            삭제
                        </button>
                    </div>
                )}
            </>
        )
    }


    function clickLikeHandler() {
        if (isLogin) {
            if (isLiked) {
                cancleLike();
            } else {
                hitLike();
            }
        } else {
            alert("로그인이 필요한 기능입니다.");
        }
    }

    function hitLike() {
        axios.get(`${API_LIKE_BASE}/replies/${props.id}`, {
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            setIsLiked(true);
            likes.cnt += 1;
        }).catch(err => {
            console.log(err);
        })
    }

    function cancleLike() {
        axios.delete(`${API_LIKE_BASE}/replies/${props.id}`, {
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            setIsLiked(false);
            likes.cnt -= 1;
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        !modifyMode ? (
            <div className="Quiz-Contents-Section
            flex justify-between overflow-hidden whitespace-no-wrap">
                <div>
                    <div className="flex items-baseline space-x-3 mb-1.5">
                        <div className="text-xs font-bold">
                            <span>{props.author}</span>
                        </div>
                        <CreatedAt/>
                        <ReplyBtns/>
                    </div>
                    <div className="text-sm">
                        <p className="">{replyContents}</p>
                    </div>
                </div>
                <div
                    className={`text-xs h-fit min-w-max my-auto p-1 px-2 ml-2 border-[1px]  rounded-full
                                ${isLiked ? "bg-gradient-to-t from-yellow-300 to-yellow-100 border-yellow-200" : "border-gray-300"}`}
                    onClick={clickLikeHandler}>
                    😆 {likes.cnt}
                </div>
            </div>
        ) : (
            <div className="flex justify-between items-center">
                <div className="w-full shrink">
                    <textarea className="w-full h-16" value={replyContents}
                              onChange={e => setReplyContents(e.target.value)}/>
                </div>
                <div className="flex-col w-auto ml-2">
                    <div className="flex flex-col items-center">
                        <button className="text-sm bg-black text-white font-bold w-[65px] my-1 p-1 rounded"
                                onClick={modifyReply}>
                            수정완료
                        </button>
                        <button className="text-sm text-gray-600 underline"
                                onClick={() => setModifyMode(false)}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default ReplyOne;