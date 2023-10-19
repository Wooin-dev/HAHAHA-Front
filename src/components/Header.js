import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLogined, loginUsername} from "../recoil/loginState";
import {getCookie, removeCookie} from "../util/cookie";

export default function Header() {

    const [isLogin, setIsLogin] = useRecoilState(isLogined);
    const [username, setUsername] = useRecoilState(loginUsername);
    const navigate = useNavigate();


    useEffect(() => {
        if (isLogin) {
            setUsername(getCookie('Login-Username'));
            setIsLogin(true);
        }
    }, [isLogin])


    const logoutHandler = (e) => {
        e.preventDefault();
        console.log('logout handler worked')

        removeCookie('Refresh-Token');
        removeCookie('Authorization');
        removeCookie('Login-Username');
        setUsername(null);
        setIsLogin(false);
        navigate('/');
    }

    const loginOutNav = isLogin
        ? <li>
            <Link className='header-nav-item' onClick={e => logoutHandler(e)}>
                로그아웃
            </Link>
        </li>
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
                        <li>
                            <Link className='header-nav-item' to='/my-page'>
                                마이페이지
                            </Link>
                        </li>
                        {
                            isLogin &&
                            <li>
                                <div className='header-nav-item'>
                                    {username}님 안녕하세요.
                                </div>
                            </li>
                        }
                        {loginOutNav}
                    </ul>


                </div>
            </div>
        </div>
    )
}