import React from "react";
import {dummy} from "../quizDummy";
import QuizThumb from "../components/QuizThumb";
import QuizCreateButton from "../components/QuizCreateButton";

export default function Quiz() {
    return (
        <div>
            <h1>Quiz</h1><br/>
            <div className='quiz-container'>
                {
                    dummy.map((quiz)=>{
                        return (
                            <QuizThumb id={quiz.id} title={quiz.title} hint={quiz.hint} answer={quiz.answer} />
                        )
                    })
                }
                <QuizCreateButton />
            </div>



        </div>
    )
}