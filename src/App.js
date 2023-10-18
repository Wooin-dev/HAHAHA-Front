import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Mypage from "./pages/Mypage";
import Rank from "./pages/Rank";
import QuizSelect from "./pages/QuizSelect";
import QuizCreate from "./pages/QuizCreate";
import QuizModify from "./pages/QuizModify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginRedirect from "./pages/LoginRedirect";

function App() {

    return (
        <div className='root-wrap'>
            <BrowserRouter>
                {/*Routes 영향 받지 않는 페이지는 태그 바깥으로*/}
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/quizzes" element={<Quiz/>}/>
                    <Route path="/quizzes/:id" element={<QuizSelect/>}/>
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
