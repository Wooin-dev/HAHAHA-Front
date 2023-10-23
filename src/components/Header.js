import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {isLoginSelector, UserInfoAtom} from "../recoil/loginState";
import {removeCookie} from "../util/cookie";

export default function Header() {

    const [isLogin, setIsLogin] = useRecoilState(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        console.log('로그아웃 버튼');

        removeCookie('Authorization');
        removeCookie('Refresh-Token');

        setUserInfo(undefined);
        localStorage.removeItem('user-info');

        navigate('/');
    }

    const LoginOutNav = isLogin
        ?
        <>
            <li>
                <div className='header-nav-item'>
                    {isLogin && userInfo.nickname}님 안녕하세요.
                </div>
            </li>
            <li>
                <Link className='header-nav-item' to='/my-page'>
                    마이페이지
                </Link>
            </li>
            <li>
                <Link className='header-nav-item' onClick={e => logoutHandler(e)}>
                    로그아웃
                </Link>
            </li>
        </>
        : <li>
            <Link className='header-nav-item' to='/login'>
                로그인
            </Link>
        </li>

    return (
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link style={{display: 'flex', alignItems: 'center'}} to='/'>
                        Go to home
                    </Link>
                    <ul>
                        <li>
                            <Link className='header-nav-item' to='/quizzes'>
                                퀴즈
                            </Link>
                        </li>
                        <li>
                            <Link className='header-nav-item' to='/rank'>
                                아재왕
                            </Link>
                        </li>
                        {LoginOutNav}
                    </ul>
                </div>
            </div>
        </div>
    )
}