import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import QuizListPage from "./pages/QuizListPage/QuizListPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Mypage from "./pages/Mypage";
import Rank from "./pages/Rank";
import QuizOne from "./pages/QuizOne";
import QuizCreate from "./pages/QuizCreate";
import QuizModify from "./pages/QuizModify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginRedirect from "./pages/LoginRedirect";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {UserInfoAtom} from "./recoil/loginState";
import {getCookie} from "./util/cookie";

function App() {

    console.log('App 컴포넌트 실행');

    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

    useEffect(() => {

        const cookie = getCookie('Authorization');

        if (cookie===undefined) {
            console.log('Authorization 쿠키가 없다')
            localStorage.removeItem('user-info');

        } else {
            console.log('Authorization 쿠키가 있다')
            const storedUserInfo = localStorage.getItem('user-info');
            const parsedUserInfoJson = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfoJson);

            console.log('userInfo Set완료 : ')
            console.log(userInfo);
        }
    }, [])


    return (
        <div className="w-[1000px] m-auto pb-10">
            <BrowserRouter>
                {/*Routes 영향 받지 않는 페이지는 태그 바깥으로*/}
                <Header/>
                <Routes>
                    {/*<Route path="/" element={<Home/>}/>*/}
                    <Route path="/" element={<QuizListPage/>}/>
                    <Route path="/quizzes" element={<QuizListPage/>}/>
                    <Route path="/quizzes/:id" element={<QuizOne/>}/>
                    <Route path="/quizzes/create" element={<QuizCreate/>}/>
                    <Route path="/quizzes/modify/:id" element={<QuizModify/>}/>
                    <Route path="/rank" element={<Rank/>}/>
                    <Route path="/my-page" element={<Mypage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/api/users/kakao/callback" element={<LoginRedirect/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
