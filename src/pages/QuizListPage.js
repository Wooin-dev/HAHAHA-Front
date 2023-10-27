import React, {useEffect, useState} from "react";

import QuizThumb from "../components/QuizThumb";
import QuizCreateButton from "../components/QuizCreateButton";
import axios from "axios";
import {dummy} from "../quizDummy";

export default function QuizListPage() {

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/quizzes').then(res => {
            setQuizzes(res.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const Title = () => {
        return (
            <h1 className="
            text-4xl font-bold text-center
            m-auto p-16
            ">
                유-우머
            </h1>
        )
    }

    const ButtonLine = () => {
        return (
            <div className="flex justify-end mg-4">
                <div className="">
                    <QuizCreateButton/>
                </div>
            </div>
        )
    }

    const QuizListSection = () => {
        return (
            <div className="">
                <div className="
                space-y-2
                ">
                    {
                        quizzes.map((quiz) => {
                            return (
                                <QuizThumb key={quiz['quizId']}
                                           quiz={quiz}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <Title/>
            <div className="w-[650px] m-auto space-y-4">
                <ButtonLine/>
                <QuizListSection/>
            </div>
        </div>
    )
}