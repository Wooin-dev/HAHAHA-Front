import React, {useState} from 'react';
import axios from "axios";

function ReplySubmit(props) {

    const [writingReply, setWritingReply] = useState('');

    const replyHandler = (e) => {
        e.preventDefault();
        setWritingReply(e.target.value);
    }

    return (
        <div className="space-x-2">
            <input className="w-[485px] h-10 p-4 rounded-xl" value={writingReply} placeholder={'댓글을 입력해주세요.'}
                   onChange={replyHandler}/>
            <button className="bg-blue-600 text-white rounded-xl p-1.5 "
                    onClick={() => {
                        props.onClickHandler(writingReply);
                        setWritingReply('');
                    }}>등록
            </button>
        </div>
    );
}

export default ReplySubmit;