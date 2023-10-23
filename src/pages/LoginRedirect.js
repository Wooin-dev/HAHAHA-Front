import {useEffect} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {UserInfoAtom} from "../recoil/loginState";

const LoginRedirect = () => {

    const code = new URL(window.location.href).searchParams.get("code");
    const setUserInfo = useSetRecoilState(UserInfoAtom);

    //인가코드 백으로 보내는 코드
    useEffect(() => {

            axios.get(`http://localhost:8080/api/users/kakao/callback?code=${code}`, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
                    "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것.
                },
                withCredentials: true
            }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면

                setUserInfo(res.data);
                localStorage.setItem('user-info', JSON.stringify(res.data));

                window.location.href='/'
            }).catch(err => {
                console.log(`카카오 로그인 Error : ${err}`);
            });
    }, []);


    return (
        <div className="LoginHandeler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default LoginRedirect;