import React from 'react';

function ReplyOne(props) {
    return (
        <div>
            <div>댓글 내용 : {props.contents}</div>
            <div>작성자 : {props.author}</div>
            <div>작성시간 : {props.createdAt}</div>
        </div>
    );
}

export default ReplyOne;