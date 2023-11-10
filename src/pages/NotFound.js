import React from "react";
import {useNavigate} from "react-router-dom";

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <div className={'page-container'}>
            <div style={{
                marginTop: '64px',
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '35px'
            }}>해당 페이지를 찾지 못했습니다.
            </div>
            <div className="mx-10 text-3xl border-2 w-fit p-2 cursor-pointer rounded-2xl"
                 onClick={() => navigate('/')}
            >메인 페이지로 이동
            </div>
        </div>
    )
}