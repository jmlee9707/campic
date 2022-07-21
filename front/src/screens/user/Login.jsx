import React from "react";
import logo from "@images/logo/logo_text_green.svg";
import kakao from "@images/icon/kakao.svg";
import naver from "@images/icon/naver.svg";
import google from "@images/icon/google.svg";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container flex">
      <div id="login" className="login flex justify-center">
        <div className="login_title">
          <img src={logo} alt="logoImage" className="login_title_logo" />
        </div>
        <div className="login_input flex align-center justify-center">
          <input
            className="login_input_ID notoReg fs-16"
            type="email"
            placeholder="이메일"
          />
          <input
            className="login_input_PW notoReg fs-16"
            type="text"
            placeholder="비밀번호"
          />
        </div>
        <div className="login_btn flex align-center justify-center">
          <button className="fs-18 notoBold" type="button">
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
            <img src={kakao} alt="kakao" />
          </button>
          <button className="login_social_icon_naver" type="button">
            <img src={naver} alt="naver" />
          </button>
          <button className="login_social_icon_google" type="button">
            <img src={google} alt="google" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
