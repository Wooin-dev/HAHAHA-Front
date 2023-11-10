import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {isLoginSelector, UserInfoAtom} from "../recoil/loginState";
import {removeCookie} from "../util/cookie";
import {KAKAO_AUTH_URL} from "../constants/OAuth";

// import kakaoLoginBtnImg from './src_assets/kakao_login_medium_wide.png';

export default function Header() {

    const [isLogin, setIsLogin] = useRecoilState(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
    const [showModal, setShowModal] = useState(false);

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
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const LoginModalContents = ({handleClose, show}) => {
        const showHideClassName = show ? "modal fixed w-full h-full top-0 left-0 z-40 flex items-center justify-center" : "modal hidden";

        return (
            <div className={showHideClassName}>
                <div className="modal-overlay absolute w-full h-full  bg-gray-900 opacity-50"
                     onClick={handleClose}></div>
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto z-50 rounded shadow-lg overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6 relative">
                        <div>
                            <h2 className="text-2xl font-bold text-center my-5">로그인</h2>
                            <p className="mt-2 text-center">소셜 로그인으로 간편하게 이용하세요.</p>
                        </div>
                        <div className="absolute top-2 right-2 cursor-pointer"
                             onClick={handleClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                                <path d="M20 20L4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                            </svg>
                        </div>
                        <div className="">
                            <img className="mx-auto mt-7 mb-5 cursor-pointer"
                                 src="/img/kakao_login_medium_wide.png" alt="카카오로 로그인하기"
                                 onClick={(e) => {
                                     e.preventDefault();
                                     window.location.href = KAKAO_AUTH_URL;
                                 }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const LoginOutNav = () => {
        return (
            isLogin
                ?
                <div className="text-sm text-gray-600 ml-auto mr-5 space-x-4 flex">
                    <div className="">
                        {isLogin && userInfo.nickname}님 안녕하세요.
                    </div>
                    <Link className=""
                          to={"/my-page"}>
                        마이페이지
                    </Link>
                    <div className="cursor-pointer hover:text-gray-800"
                         onClick={e => logoutHandler(e)}>
                        로그아웃
                    </div>
                </div>
                : <button onClick={handleOpenModal}
                          className="text-sm leading-6 text-white bg-blue-500 font-bold py-2 px-4 rounded">
                    로그인
                </button>
        )
    }

    return (
        <header
            className="mb-5 bg-gray-100 shadow text-black min-w-2100 w-full flex justify-between items-center p-2 z-10">
            <div className="flex items-center">
                <Link className="text-xl font-bold ml-10 whitespace-nowrap flex-shrink-0" to="/">푸하하</Link>
                <nav className="ml-10 space-x-4 whitespace-nowrap flex-shrink-0">
                    <Link to="/quizzes" className="hover:text-gray-400">유-우머</Link>
                    {/*<Link to="/rank" className="hover:text-gray-400">아재왕</Link>*/}
                </nav>
            </div>
            <LoginOutNav/>
            <LoginModalContents show={showModal} handleClose={handleCloseModal}/>
        </header>
    )
}