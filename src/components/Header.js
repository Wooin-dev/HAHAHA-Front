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

        window.location.href = "/";
        // navigate('/');
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
        <header
            className="mb-5 bg-gray-100 shadow text-black min-w-2100 w-full flex justify-between items-center p-2 z-10">
            <div className="flex items-center">
                <Link className="text-xl font-bold ml-10 whitespace-nowrap flex-shrink-0" to="/">푸하하</Link>
                <nav className="ml-10 space-x-4 whitespace-nowrap flex-shrink-0">
                    <Link to="/quizzes" className="hover:text-gray-400">유-우머들</Link>
                    <Link to="/rank" className="hover:text-gray-400">아재왕</Link>
                </nav>
            </div>
            <div className="ml-auto mr-5 space-x-4">
                <Link to="/rank" className="text-sm">마이 페이지</Link>
                {/*<a href="#" className="text-sm font-semibold leading-6 text-gray-900"></a>*/}
                <Link to="/login">
                    <button className="text-sm leading-6 text-gray-900">Log in
                        {/*<span aria-hidden="true">&rarr;</span>*/}
                    </button>
                </Link>
            </div>
        </header>
        // <div className="header-container">
        //     <div className="header-wrap">
        //         <div className="header-left-wrap">
        //             <Link style={{display: 'flex', alignItems: 'center'}} to='/'>
        //                 Go to home
        //             </Link>
        //             <ul>
        //                 <li>
        //                     <Link className='header-nav-item' to='/quizzes'>
        //                         퀴즈
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link className='header-nav-item' to='/rank'>
        //                         아재왕
        //                     </Link>
        //                 </li>
        //                 {LoginOutNav}
        //             </ul>
        //         </div>
        //     </div>
        // </div>
    )
}