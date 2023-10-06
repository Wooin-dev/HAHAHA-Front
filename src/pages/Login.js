import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login(props) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();


    function loginBtnHandler() {
        axios.post('http://localhost:8080/api/users/login', {
            username: id,
            password: pwd
        }).then(res=> {
            console.log(res);
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
                <button value={"로그인"} onClick={e=>{
                    e.preventDefault()
                    // console.log(`id: ${id}, pwd: ${pwd}`);
                    // alert(`id: ${id}, pwd: ${pwd}`);
                    loginBtnHandler();
                }}>로그인</button>
            </div>

            <button onClick={e=>{
                navigate('/sign-up');
            }}>회원가입</button>

            <div>
                <br/>
                {`id : ${id} / pwd : ${pwd}`}
            </div>
        </div>
    );
}

export default Login;