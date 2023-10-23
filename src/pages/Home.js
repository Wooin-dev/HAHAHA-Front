import React from "react";
import {useRecoilValue} from "recoil";
import {isLoginSelector, UserInfoAtom} from "../recoil/loginState";
import {getCookie} from "../util/cookie";

export default function Home() {

    const userInfo = useRecoilValue(UserInfoAtom);
    const isLogin = useRecoilValue(isLoginSelector);
    const authorization = getCookie('Authorization');

    const loginStatus = isLogin ? "OK" : "not yet";
    console.log(`로그인 유저 정보 :`);
    console.log(userInfo);


    return (
        <div>
            <div>Home</div>
            <div>Username : {isLogin ? userInfo.username : ''}</div>
            <div>Login : {loginStatus}</div>
            <div>Authorization : {authorization}</div>
        </div>
    )
}