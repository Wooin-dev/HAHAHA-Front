import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login(props) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();

    return (
        <div>Login

            <form onClick={e => {
                e.preventDefault()
                console.log(`id: ${id}, pwd: ${pwd}`);
                alert(`id: ${id}, pwd: ${pwd}`);

            }}>
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
                <input type={"submit"} value={"로그인"}/>
            </form>
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