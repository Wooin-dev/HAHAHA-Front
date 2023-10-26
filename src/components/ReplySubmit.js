import React, {useState} from 'react';
import axios from "axios";

function ReplySubmit(props) {

    const [writingReply, setWritingReply] = useState('');

    const replyHandler = (e) => {
        e.preventDefault();
        setWritingReply(e.target.value);
    }

    return (
        <div>
            <input value={writingReply} placeholder={'댓글을 입력해주세요.'} onChange={replyHandler}/>
            <button onClick={() => props.onClickHandler(writingReply)}>댓글 달기</button>
        </div>
    );
}

export default ReplySubmit;