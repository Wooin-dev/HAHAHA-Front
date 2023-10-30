import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Mypage() {

    const [myProfile, setMyProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();


    console.log('mypage render');
    useEffect(() => {

        axios.get("http://localhost:8080/api/my-page/my-profile",
            {withCredentials: true})
            .then(res => {
                setMyProfile(res.data);
            })
    }, [])


    const MyInfo = (props) => {

        const [nickname, setNickname] = useState(props.myProfile.nickname);

        const editProfileBtnHandler = (e) => {

            const requestDto = {
                nickname: nickname,
            }

            axios.put("http://localhost:8080/api/my-page/edit-profile",
                requestDto, {
                    withCredentials: true,
                })
                .then(res => {
                    if (res.status.valueOf() === 200) {
                        alert('수정완료');
                    }
                    window.location.href="/my-page";
                })
        }

        return (
            !editMode ? (
                <div className="w-[500px] mx-auto border-[1px] border-gray-300 p-10 space-y-5">
                    <div>
                        <p className="text-xs font-bold">이메일 계정</p>
                        <p>{myProfile.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold">닉네임</p>
                        <p>{myProfile.nickname}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold">회원가입일</p>
                        {myProfile && myProfile.createdAt ? (
                            <div>
                                <p>{myProfile.createdAt.slice(0, 10)}</p>
                            </div>
                        ) : (
                            <div>
                                <p></p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-[500px] mx-auto border-[1px] border-gray-300 p-10 space-y-5">
                    <div>
                        <p className="text-xs font-bold">이메일 계정</p>
                        <p>{myProfile.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold">닉네임</p>
                        <input className="border-b py-1.5 placeholder:text-sm"
                               placeholder="새로운 닉네임을 입력해주세요."
                               value={nickname}
                               onChange={(e) => {
                                   e.preventDefault();
                                   setNickname(e.target.value);
                               }}/>
                    </div>
                    <div>
                        <p className="text-xs font-bold">회원가입일</p>
                        {myProfile && myProfile.createdAt ? (
                            <div>
                                <p>{myProfile.createdAt.slice(0, 10)}</p>
                            </div>
                        ) : (
                            <div>
                                <p></p>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-2 justify-center">
                        <button className="bg-blue-600 text-sm text-white p-2 rounded-xl"
                                onClick={editProfileBtnHandler}> 수정
                        </button>
                        <button className="text-sm border-[1px] text-gray-700 border-blue-500 p-1.5 rounded-xl"
                                onClick={() => {
                                    setEditMode(false)
                                }}> 취소
                        </button>
                    </div>
                </div>
            )
        )
    }


    return (
        <div className="MyPage">
            <div className="title text-center text-4xl font-bold my-7 py-3">마이페이지</div>
            <div className="border-t border-gray-200 w-full mx-auto"></div>
            <div id="container-mypage" className="flex">

                <div id="contents-mypage"
                     className="w-full">

                    <div id="my-stastics"
                         className="flex justify-center space-x-2 my-20">
                        <div className="text-center w-[150px]">
                            <p className="text-3xl my-2">{myProfile.createdQuizCnt}</p>
                            <p className="text-sm font-bold">도전한 퀴즈 수</p>
                        </div>
                        <div className="text-center w-[150px]">
                            <p className="text-3xl my-2">{myProfile.createdQuizCnt}</p>
                            <p className="text-sm font-bold">풀은 퀴즈 수</p>
                        </div>
                        <div className="text-center w-[150px]">
                            <p className="text-3xl my-2">{myProfile.createdQuizCnt}</p>
                            <p className="text-sm font-bold">만든 퀴즈 수</p>
                        </div>
                    </div>


                    <MyInfo myProfile={myProfile}/>

                    <div id="buttons"
                         className="flex justify-center py-5 space-x-2">

                        <button className="cursor-pointer bg-blue-600 font-medium text-sm text-white p-2 rounded-xl"
                                onClick={() => setEditMode(true)}>
                            회원 정보 수정
                        </button>
                        <button
                            className="cursor-pointer font-medium text-sm text-red-700 border-red-700 border-[1px] p-2 rounded-xl">
                            회원 탈퇴
                        </button>
                    </div>


                </div>
                {/*/!*<div id="side-nav-mypage"*!/ todo 사이드바*/}
                {/*     className="w-[200px]">*/}
                {/*    <p>내 정보</p>*/}
                {/*    <p>회원 정보</p>*/}
                {/*    <p>회원정보 변경</p>*/}
                {/*    <p>회원탈퇴</p>*/}
                {/*</div>*/}
            </div>


        </div>
    )
}