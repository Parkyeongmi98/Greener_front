import React from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

function KakaoLogin() {
    const location = useLocation();
    const code = location.search.split('=')[1];
    console.log(code)
    fetch(`/oauth/kakao/callback/${code}`, {
        method:'GET',
    })
        .then(response => {
            const access = response.headers.get("access");
            console.log('성공')
            // 토큰을 헤더 디폴트 값으로 설정
            axios.defaults.headers.common[
                'accessToken'
                ] = `Bearer ${access}`;
            localStorage.setItem("access", response.headers.get("access"));
            localStorage.setItem("id", response.headers.get("id"));
            document.location.href = "/";
        })
        .catch((error) => {
            console.log(error);
            document.location.href = "/login";
        });
        
        const Background = styled.div`
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #ffffffb7;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        `;

        const LoadingText = styled.div`
        font: 1.5rem 'Noto Sans KR';
        text-align: center;
        `

    return (
        <>
        <Background>
            <LoadingText>로그인하는중...</LoadingText>
            <img src="/img/Loading.gif" alt="로딩중" width="15%" />
        </Background>
        </>

    );
}

export default KakaoLogin;



