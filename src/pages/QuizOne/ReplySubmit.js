import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";

function ReplySubmit(props) {

    const [writingReply, setWritingReply] = useState('');
    const isLogin = useRecoilValue(isLoginSelector);

    const replyHandler = (e) => {
        e.preventDefault();
        setWritingReply(e.target.value);
    }

    const replySubmit = () => {
            props.onClickHandler(writingReply);
            setWritingReply('');
    }

    return (
        <div className="space-x-2">
            <input className="w-[485px] h-10 p-4 rounded-xl disabled:bg-white" value={writingReply}
                   placeholder={isLogin ? '댓글을 입력해주세요.' : "로그인이 필요합니다."}
                   onChange={replyHandler}
                   disabled={!isLogin}
                   onKeyDown={e => {
                       if (e.key === 'Enter') {
                           replySubmit();
                       }
                   }}/>
            <button className="bg-blue-600 text-white rounded-xl p-1.5 "
                    onClick={() => {
                        replySubmit();
                    }}>등록
            </button>
        </div>
    );
}

export default ReplySubmit;