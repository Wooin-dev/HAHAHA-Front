import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_MYPAGE_BASE} from "../../constants/uri";
import SideBar from "./Components/SideBar";
import {
    MY_CHECK_HINT_QUIZ,
    MY_CREATED_QUIZ,
    MY_LIKED_QUIZ,
    MY_PAGE_MAIN,
    MY_SOLVED_QUIZ,
    MY_TRY_QUIZ
} from "./constants/myPageContentsName";
import MyPageMain from "./Components/MyPageMain/MyPageMain";
import MyLikedQuiz from "./Components/MyLikedQuiz";
import Title from "../../components/Title";
import MyTryQuiz from "./Components/MyTryQuiz";
import MyCreatedQuiz from "./Components/MyCreatedQuiz";
import MySolvedQuiz from "./Components/MySolvedQuiz";
import MyCheckedHintQuiz from "./Components/MyCheckedHintQuiz";

export default function Mypage() {

    const [myProfile, setMyProfile] = useState({});
    const [contentsType, setContentsType] = useState(MY_PAGE_MAIN);

    useEffect(() => {
        //내 정보 가져오기
        axios.get(`${API_MYPAGE_BASE}/my-profile`,
            {withCredentials: true})
            .then(res => {
                setMyProfile(res.data);
            })
    }, [])


    const MyPageContents = (props) => {
        if (props.contentsType === MY_PAGE_MAIN) return <MyPageMain myProfile={myProfile}/>
        if (props.contentsType === MY_LIKED_QUIZ) return <MyLikedQuiz/>
        if (props.contentsType === MY_TRY_QUIZ) return <MyTryQuiz/>
        if (props.contentsType === MY_CHECK_HINT_QUIZ) return <MyCheckedHintQuiz/>
        if (props.contentsType === MY_SOLVED_QUIZ) return <MySolvedQuiz/>
        if (props.contentsType === MY_CREATED_QUIZ) return <MyCreatedQuiz/>
    }

    return (
        <div className="MyPage">
            <Title title="마이페이지"/>
            <div id="container-mypage" className="flex border-t border-gray-200">
                <div className="w-full ml-16">
                    <MyPageContents contentsType={contentsType}/>
                </div>
                <SideBar setContentsTypeHandler={setContentsType}/>
            </div>
        </div>

    )
}