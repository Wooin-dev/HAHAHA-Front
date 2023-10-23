import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {KAKAO_AUTH_URL} from "../components/OAuth";
import {useRecoilState} from "recoil";
import {UserInfoAtom} from "../recoil/loginState";

function Login() {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

    const navigate = useNavigate();


    function loginBtnHandler() {
        axios.post('http://localhost:8080/api/users/login', {
            username: id,
            password: pwd
        }, {
            withCredentials: true
        }).then(res => {
            setUserInfo(res.data);
            localStorage.setItem('user-info', JSON.stringify(res.data));
            navigate('/',);
        }).catch(error => {
            alert(error)
            console.log(error)
        })
    }


    return (
        <div>Login

            <div>
                <div>
                    id: <input name={"id"} value={id} onChange={e => {
                    setId(e.target.value);
                }}/>
                </div>
                <div>
                    pwd: <input name={"pwd"} value={pwd} type={"password"} onChange={e => {
                    setPwd(e.target.value)
                }}/>
                </div>
                <button value={"로그인"} onClick={e => {
                    e.preventDefault();
                    loginBtnHandler();
                }}>로그인
                </button>

                <button onClick={(e) => {
                    e.preventDefault();
                    window.location.href = KAKAO_AUTH_URL;
                }}>카카오 로그인
                </button>


            </div>

            <button onClick={e => {
                navigate('/sign-up');
            }}>회원가입
            </button>

            <div>
                <br/>
                {`id : ${id} / pwd : ${pwd}`}
            </div>
        </div>
    );
}

export default Login;