import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {isLoginSelector, UserInfoAtom} from "../recoil/loginState";
import {removeCookie} from "../util/cookie";

export default function Header() {

    const [isLogin, setIsLogin] = useRecoilState(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
    const navigate = useNavigate();
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
        const showHideClassName = show ? "modal fixed w-full h-full top-0 left-0 flex items-center justify-center" : "modal hidden";

        return (
            <div className={showHideClassName}>
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div>
                            <h2 className="text-2xl font-bold">모달 제목</h2>
                            <p className="mt-2">모달 내용</p>
                        </div>
                        <div className="mt-4 text-right">
                            <button onClick={handleClose}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                닫기
                            </button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M20 20L4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
        <header className="mb-5 bg-gray-100 shadow text-black min-w-2100 w-full flex justify-between items-center p-2 z-10">
            <div className="flex items-center">
                <Link className="text-xl font-bold ml-10 whitespace-nowrap flex-shrink-0" to="/">푸하하</Link>
                <nav className="ml-10 space-x-4 whitespace-nowrap flex-shrink-0">
                    <Link to="/quizzes" className="hover:text-gray-400">유-우머들</Link>
                    <Link to="/rank" className="hover:text-gray-400">아재왕</Link>
                </nav>
            </div>
            <div className="ml-auto mr-5 space-x-4">
                <Link to="/rank" className="text-sm">
                    마이 페이지
                </Link>
                {/*<Link to="/login"></Link>*/}
                <button onClick={handleOpenModal}
                        className="text-sm leading-6 text-white bg-blue-500 font-bold py-2 px-4 rounded">
                    로그인
                </button>
            </div>
            <LoginModalContents show={showModal} handleClose={handleCloseModal}/>
        </header>
    )
}