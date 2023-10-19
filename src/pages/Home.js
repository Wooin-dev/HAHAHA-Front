import React from "react";
import {useRecoilValue} from "recoil";
import {isLogined, loginUsername} from "../recoil/loginState";

export default function Home() {

    const loginUserInfo = useRecoilValue(loginUsername);
    const isLogin = useRecoilValue(isLogined);

    const loginStatus = isLogin ? "OK" : "not yet";

    return (
        <div>
            <div>Home</div>
            <div>Username : {loginUserInfo}</div>
            <div>Login : {loginStatus}</div>
        </div>
    )
}