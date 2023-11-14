import React, {useEffect, useState} from "react";

import QuizThumb from "../../components/QuizThumb";
import axios from "axios";
import PageBtnRow from "./Components/PageBtnRow";
import Title from "../../components/Title";
import UtilBtnLine from "./Components/UtilBtnLine";
import {API_QUIZ_BASE} from "../../constants/uri";

export default function QuizListPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [startPage, setStartPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 상태로 관리합니다.
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수입니다. 적절히 조정해야 합니다.

    useEffect(() => {
        axios.get(`${API_QUIZ_BASE}`, {
            params: {
                page: currentPage,
                size: 10,
                sortBy: "createdAt",
                isAsc: false,
            }
        }).then(res => {
            setQuizzes(res.data.content);
            setTotalPages(res.data.totalPages);
        }).catch(error => {
            console.log(error)
        })
    }, [currentPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            <Title title="유-우머" subtitle="부장님의 입꼬리가 씰룩거리는 이유"/>
            <div className="w-[650px] m-auto space-y-4">
                <UtilBtnLine/>
                <QuizListSection/>
                <PageBtnRow style="container flex justify-center mx-auto mt-8"
                            startPage={startPage}
                            setStartPage={setStartPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
            </div>
        </div>
    )
}