import React, {useState} from 'react';
import MyInfo from "./MyInfo";

const MyPageMain = (props) => {
    const myProfile = props.myProfile;
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="">
            <div className="my-20">
                <div id="my-stastics"
                     className="flex justify-center ">
                    <div className="text-center w-[150px]">
                        <p className="text-3xl my-2">{myProfile.showQuizCnt}</p>
                        <p className="text-sm font-bold">도전한 유-우머</p>
                    </div>
                    <div className="text-center w-[150px]">
                        <p className="text-3xl my-2">{myProfile.showHintCnt}</p>
                        <p className="text-sm font-bold">힌트를 본 유-우머</p>
                    </div>
                    <div className="text-center w-[150px]">
                        <p className="text-3xl my-2">{myProfile.solveQuizCnt}</p>
                        <p className="text-sm font-bold">맞춘 유-우머</p>
                    </div>
                    <div className="text-center w-[150px]">
                        <p className="text-3xl my-2">{myProfile.createdQuizCnt}</p>
                        <p className="text-sm font-bold">만든 유-우머</p>
                    </div>
                </div>
            </div>


            <MyInfo editMode={editMode} setEditMode={setEditMode} myProfile={myProfile}/>

            <div id="buttons"
                 className="flex justify-center py-5 space-x-2">

                <button className="cursor-pointer bg-blue-600 font-medium text-sm text-white p-2 rounded-xl"
                        onClick={() => setEditMode(true)}>
                    회원 정보 수정
                </button>
                <button
                    className="hidden cursor-pointer font-medium text-sm text-red-700 border-red-700 border-[1px] p-2 rounded-xl">
                    회원 탈퇴
                </button>
            </div>
        </div>
    );
}
export default MyPageMain;