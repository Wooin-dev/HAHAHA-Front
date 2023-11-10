import React, {useEffect} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {UserInfoAtom} from "../recoil/loginState";
import {API_USERS_BASE} from "../constants/uri";

const LoginRedirect = () => {

    const code = new URL(window.location.href).searchParams.get("code");
    const setUserInfo = useSetRecoilState(UserInfoAtom);

    //인가코드 백으로 보내는 코드
    useEffect(() => {

        axios.get(`${API_USERS_BASE}/kakao/callback?code=${code}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
                "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것.
            },
            withCredentials: true
        }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면

            setUserInfo(res.data);
            console.log("로그인 완료");
            localStorage.setItem('user-info', JSON.stringify(res.data));

            // window.location.href='/'
            }).catch(err => {
                console.log(`카카오 로그인 Error : ${err}`);
            });
    }, []);


    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="">
                <div
                    className="animate-spin mx-auto mb-5 rounded-full h-16 w-16 border-t-4 border-cyan-600 border-cyan-700"></div>
                <div className="text-center z-50">
                    <p>로그인 중입니다.</p>
                    <p>잠시만 기다려주세요.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginRedirect;