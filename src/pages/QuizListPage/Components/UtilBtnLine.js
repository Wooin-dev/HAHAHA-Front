import React from 'react';
import QuizCreateButton from "./QuizCreateButton";

function UtilBtnLine(props) {
    return (
        <div className="flex justify-end mg-4">
            <div className="">
                <QuizCreateButton/>
            </div>
        </div>
    );
}

export default UtilBtnLine;