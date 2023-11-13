import React from 'react';
import {useRecoilValue} from "recoil";
import {UserInfoAtom} from "../recoil/loginState";

function ReplyOne(props) {

    const userInfo = useRecoilValue(UserInfoAtom);
    console.log("userInfo 댓글에서 log");
    console.log(userInfo);

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
                    <div className="text-xs font-bold text-gray-600 flex space-x-2 items-center">
                        <div>
                            수정
                        </div>
                        <div>
                            삭제
                        </div>
                    </div>
                )}
            </>
        )
    }


    return (
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
                    <p className="">{props.contents}</p>
                </div>
            </div>
            <ReplyBtns/>
        </div>
    );
}

export default ReplyOne;