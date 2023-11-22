import React, {useState} from 'react';
import axios from "axios";
import {API_MYPAGE_BASE} from "../../../../constants/uri";

const MyInfo = (props) => {

    const [nickname, setNickname] = useState(props.myProfile.nickname);
    const [myProfile, setMyProfile] = useState(props.myProfile)
    const editProfileBtnHandler = () => {

        const requestDto = {
            nickname: nickname,
        }

        axios.put(`${API_MYPAGE_BASE}/edit-profile`,
            requestDto, {
                withCredentials: true,
            })
            .then(res => {
                if (res.status.valueOf() === 200) {
                    alert('수정완료');
                }
                window.location.href = "/foohaha/my-page";
            })
    }

    return (
        !props.editMode ? (
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
                                props.setEditMode(false)
                            }}> 취소
                    </button>
                </div>
            </div>
        )
    )
}

export default MyInfo;