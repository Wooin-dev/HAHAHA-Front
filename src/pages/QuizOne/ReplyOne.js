import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {UserInfoAtom} from "../../recoil/loginState";
import {API_REPLY_BASE} from "../../constants/uri";
import axios from "axios";

function ReplyOne(props) {

    const userInfo = useRecoilValue(UserInfoAtom);
    const [replyContents, setReplyContents] = useState(props.contents);
    const [modifyMode, setModifyMode] = useState(false);
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
            <div className="text-xs">
                {props && props.createdAt ? (
                    <div>
                        <p>{props.createdAt.slice(0, 10)} {props.createdAt.slice(11, 19)}</p>
                    </div>
                ) : (
                    <div>
                        <p></p>
                    </div>
                )}
            </div>
        )
    }

    const ReplyBtns = () => {

        return (
            <>
                {userInfo && props.authorId === userInfo.id && (
                    <div className="bg-green-200 text-xs underline text-gray-400 flex space-x-2 items-center">
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


    return (
        !modifyMode ? (
            <div className="Quiz-Contents-Section
            flex justify-between overflow-hidden whitespace-no-wrap">
                <div>
                    <div className="flex items-baseline space-x-2 mb-1.5">
                        <div className="text-xs font-bold">
                            <span>{props.author}</span>
                        </div>
                        <CreatedAt/>
                    </div>
                    <div className="text-sm">
                        <p className="">{replyContents}</p>
                    </div>
                </div>
                <ReplyBtns/>
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