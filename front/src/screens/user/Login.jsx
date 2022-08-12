import React, { useRef } from "react";
import logo from "@images/logo/logo_text_green.svg";
import kakao from "@images/icon/kakao.svg";
import naver from "@images/icon/naver.svg";
import google from "@images/icon/google.svg";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setUserInfo } from "@store/user";
import { login, getUserInfo } from "@apis/user"; // login api
// import { setEmail } from '@store/user';
// import { login } from "@apis/user"; // login api
const DEFAULTIMG = "iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANuSURBVHgB7ZuhbmJREIanmxWtrGyr2srK4gAHOJC8As+ERSJBggMcSHDgAAc4cLv73+RuCOmmlHvOP1N2vuQmpOI2/TrMOXPmzM2vP4gTnR/iUHDRJFw0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJH6KYQ6HgyyXS5nNZrJYLGSz2SQ/A7e3t/L4+Jg8Ly8v8vb2Jpa5sXgeDZmDwUCGw+FfsZ9xf38v7+/vksvlks/WMCcacnu93tmCT4HkUqmUCLeEKdHdbjcRHYJ8Pi+1Wk2sYEZ0u92WyWQiIUEqqdfrYgETuw5EcmjJAO/sdDpiAXXR4/E4WLr4iNFoFPX956IqervdSr/fl9jgd1y6uIZCVTS+2pAdm/1+n2wXNVEVjbTBAilEM6rVRE+nU0o0pyCqV6uVaKEmGiU1G/xztVATrRFd8/lctPivRO92O9FCTbTGwoQ8rYWfR5NQE43zZDZ3d3eihZpojTPjh4cH0UJN9Ovrq7BBN0YLNdEarSe0vLRQE42vMTNPI1Vp9hXVRGNhKhaLwgJNAE1Ut3doNzGiGtGs3UNUFY2orlQqEptyuazeGVcvWBDVhUJBYoF3a6cNYKIyrFarUWTgnXi3Ba72ugEi2YpkYO4CDdpbuEBzaVMAiytycsx0dAkmr4RBMoSj1XWucAjGdhGCNc5RPsOk6GPQFUE3BufXeI4vOWIngVIehQjKa4uCU8yLvhb8PJqEiybhokm4aBIumoSLJmF6WAjFyvFVrtPiBftonADiwWeLsyspJkSn01cQul6vk+d4AusroHCB8OfnZ3l6elJtXx2jVrDgehYqvrTqi3mhBrLxoIrUEk8VDbmYGcQZhtYVWkQ7ZKPjwpQeXXQ6M4gzC6QES6Sjcoj02Pk9muhLhjK1YAyDRhGddShTi5jDoEFFY/uFeUGNS+YhgfBGoxE0uoOJxkLXarW+XRT/C0jGMGioBTOIaHRDEMnXCGSHaBxnLsGRLqxMp8YADeMQu6XMopvN5tWki4/AEUCIb2sm0V9pnn5nULlmnYnMJDrGoLxVsv6tmURrDkiyyZqnM4m+5tx8StaJLj/4J+GiSbhoEi6ahIsm4aJJuGgSfpuUhEc0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJFw0CRdN4jfu06j7peOGKgAAAABJRU5ErkJggg==";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionStorage } = window;
  // const wait = (sec) => {
  //   const start = Date.now()
  //   let now = start;
  //   while (now - start < sec * 1000) {
  //       now = Date.now();
  //   }
  // };
  const emailRef = useRef();
  const passRef = useRef();
  const canLogin = async () => {
    const userEmail = emailRef.current.value;
    const res = await login({
      email: userEmail,
      password: passRef.current.value
    });
    // 리덕스 스토어에 이메일 저장
    dispatch(setEmail({ email: userEmail }));
    // 세션스토리지에 토큰 저장
    sessionStorage.setItem("refreshToken", res.refreshToken);
    sessionStorage.setItem("userEmail", userEmail);
    sessionStorage.setItem("accessToken", res.Authorization);
    // 유저 정보 가져오기
    // console.log("유저 정보 가져오기")
    const userRes = await getUserInfo(userEmail);
    // console.log(userRes.userInfo);
    // 유저 정보 스토어에 저장
    console.log(userRes.userInfo)
    if (userRes.userInfo.profileImg === null) {
      userRes.userInfo.profileImg = DEFAULTIMG;
    }
    dispatch(setUserInfo(userRes.userInfo));
    navigate("/");
  };

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
          <form>
            <input
              ref={passRef}
              className="login_input_PW notoReg fs-16"
              type="password"
              placeholder="비밀번호"
            />
          </form>
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
