import {BrowserRouter, Route, Routes} from "react-router-dom";
import QuizListPage from "./pages/QuizListPage/QuizListPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Mypage from "./pages/Mypage";
import Rank from "./pages/Rank";
import QuizOne from "./pages/QuizOne/QuizOne";
import QuizRequest from "./pages/QuizRequest";
import QuizModify from "./pages/QuizModify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginRedirect from "./pages/LoginRedirect";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginSelector, UserInfoAtom} from "./recoil/loginState";
import ProtectedRoute from "./Routes/ProtectedRoute";
import {getCookie} from "./util/cookie";

function App() {

    console.log('App 컴포넌트 실행');
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
    const isLogin = useRecoilValue(isLoginSelector);

    useEffect(() => {

        const cookie = getCookie("Authorization");

        console.log("cookie값 :");
        console.log(cookie);

        if (cookie === undefined) {
            localStorage.removeItem('user-info');
        } else {
            const storedUserInfo = localStorage.getItem('user-info');
            const parsedUserInfoJson = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfoJson);
        }
    }, [])

    const DevTools = () => {
        return (
            <div className="space-y-2 text-xs m-2">
                <div className="border-2 flex space-x-4 w-fit">
                    <div>쿠키 체크 : {getCookie("Authorization") && "Exist"}</div>
                    <div>로그인 상태 : {isLogin ? "On" : "Off"}</div>
                </div>
                <div className="border-2">user-info : {JSON.stringify(userInfo)}</div>


            </div>
        )
    }

    return (
        <div className="w-[1000px] m-auto pb-10">
            <BrowserRouter basename="/foohaha">
                {/*Routes 영향 받지 않는 페이지는 태그 바깥으로*/}
                <Header/>
                <DevTools/>
                <Routes>
                    {/*<Route path="/" element={<Home/>}/>*/}
                    <Route path="/" element={<QuizListPage/>}/>
                    <Route path="/quizzes" element={<QuizListPage/>}/>
                    <Route path="/quizzes/:id" element={<QuizOne/>}/>
                    <Route path="/rank" element={<Rank/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/api/users/kakao/callback" element={<LoginRedirect/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                    {/*  유저 전용 페이지  */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/quizzes/create" element={<QuizRequest/>}/>
                        <Route path="/quizzes/modify/:id" element={<QuizModify/>}/>
                        <Route path="/my-page" element={<Mypage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
