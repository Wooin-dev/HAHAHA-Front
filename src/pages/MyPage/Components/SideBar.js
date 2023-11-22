import React from 'react';
import {
    MY_CHECK_HINT_QUIZ,
    MY_CREATED_QUIZ,
    MY_LIKED_QUIZ,
    MY_PAGE_MAIN,
    MY_SOLVED_QUIZ,
    MY_TRY_QUIZ
} from "../constants/myPageContentsName";

const SideBar = (props) => {

    return (
        <>
            <div className="border-r-[1px] mr-2"/>
            <div id="side-nav-mypage"
                 className="w-[180px] text-gray-700 space-y-2 text-sm pt-10 pl-2">
                <div className="font-bold text-gray-700 mb-5">My Page</div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_PAGE_MAIN)}>내 정보</div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_LIKED_QUIZ)}>푸하하한 유-우머
                </div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_TRY_QUIZ)}>도전한 유-우머</div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_CHECK_HINT_QUIZ)}>힌트를 본
                    유-우머
                </div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_SOLVED_QUIZ)}>맞춘 유-우머
                </div>
                <div className="cursor-pointer" onClick={() => props.setContentsTypeHandler(MY_CREATED_QUIZ)}>만든 유-우머
                </div>
            </div>
        </>
    );
}

export default SideBar;