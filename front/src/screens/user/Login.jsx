import React, { useRef, useState } from "react";
import logo from "@images/logo/logo_text_green.svg";
import kakao from "@images/icon/kakao.svg";
import naver from "@images/icon/naver.svg";
import google from "@images/icon/google.svg";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setUserInfo } from "@store/user";
import { login, getUserInfo, exchangeImg } from "@apis/user"; 

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailMess, setEmailMess] = useState("");
  const { sessionStorage } = window;
  const emailRef = useRef();
  const passRef = useRef();
  const canLogin = async () => {
    try {
    const userEmail = emailRef.current.value;
    const res = await login({
      email: userEmail,
      password: passRef.current.value
    });

    dispatch(setEmail({ email: userEmail }));
    sessionStorage.setItem("refreshToken", res.refreshToken);
    sessionStorage.setItem("userEmail", userEmail);
    sessionStorage.setItem("accessToken", res.Authorization);

    let userRes = await getUserInfo(userEmail);
    
    if (userRes.userInfo.profileImg === null) {
      userRes = exchangeImg(userRes);
    }
    dispatch(setUserInfo(userRes.userInfo));
    navigate("/");
    setEmailMess("");
    } catch {
      setEmailMess("아이디 또는 비밀번호를 잘못 입력했습니다.");
    }
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      canLogin();
    }
  }
  return (
    <div className="container flex">
      <div id="login" className="login flex">
        <div className="login_title flex align-center justify-center">
          <img src={logo} alt="logoImage" />
        </div>
        <div className="login_input flex align-center justify-center">
          <input
            ref={emailRef}
            className="login_input_ID notoReg fs-16"
            type="email"
            placeholder="이메일"
          />
          <input
            ref={passRef}
            className="login_input_PW notoReg fs-16"
            type="password"
            placeholder="비밀번호"
            onKeyPress={handleOnKeyPress}
          />
          <div className="login_check notoMid fs-12">
            {emailMess}
          </div>
        </div>
        <div className="login_btn flex align-center justify-center">
          <button className="fs-18 notoBold" type="button" onClick={canLogin}>
            로그인
          </button>
        </div>

        <div className="login_text notoReg fs-14 flex justify-space-between">
          <Link to="/findid">ID 찾기</Link>
          <Link to="/join">회원가입</Link>
        </div>
        <div className="divide" />
        <div className="login_social_txt notoMid fs-12 flex align-center justify-center">
          SNS계정으로 간편 로그인
        </div>
        <div className="login_social_icons flex">
          <button className="login_social_icon_kakao" type="button">
            <a href={`${process.env.REACT_APP_KAKAO_AUTH_URL}`}>
              <img src={kakao} alt="kakao" />
            </a>
          </button>
          <button className="login_social_icon_naver" type="button">
            <a href={`${process.env.REACT_APP_NAVER_AUTH_URL}`}>
              <img src={naver} alt="naver" />
            </a>
          </button>
          <a href={`${process.env.REACT_APP_GOOGLE_AUTH_URL}`}>
            <button className="login_social_icon_google" type="button">
              <img src={google} alt="google" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;
