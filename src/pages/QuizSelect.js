import React from 'react';
import {useLocation, useParams} from "react-router-dom";

function QuizSelect(props) {

    const { id } = useParams();
    const { state } = useLocation();

    return (
        <div className='page-container'>
            <div className='quiz-select-container'>
                <div className='quiz-id'>{id}</div>
                <div className='quiz-title'>{state.title}</div>
                <div className='quiz-hint'>{state.hint}</div>
            </div>
            <div>
                <input type='text' value='dd'/>
            </div>
        </div>
    );
}


function CheckAnswer() {

    return true;
}

export default QuizSelect;