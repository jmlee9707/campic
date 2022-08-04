import React, { useState, useRef } from "react";
import kakao from "@images/icon/kakao.svg";
import naver from "@images/icon/naver.svg";
import google from "@images/icon/google.svg";
import logo from "@images/logo/logo_icon_green.svg";
import "./Join.scss";
import { Link, useNavigate } from "react-router-dom";
import { duplicateEmail, join } from "../../apis/join";

function Join() {
  const navigate = useNavigate(); // 모두 작성시 회원가입 완료페이지로 이동

  // 오류 확인
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passSameError, setPassSameError] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // 오류 메세지 상태 저장
  const [emailMess, setEmailMess] = useState("");
  const [codeMess, setCodeMess] = useState("");
  const [passMess, setPassMess] = useState("");
  const [passSameMess, setPassSameMess] = useState("");
  const [nickMess, setNickMess] = useState("");
  const [phoneMess, setPhoneMess] = useState("");

  // ref 값
  const emailRef = useRef();
  const codeRef = useRef();
  const passRef = useRef();
  const passSameRef = useRef();
  const nickRef = useRef();
  const phoneRef = useRef();

  const [code, setcode] = useState("");
  const [open, setOpen] = useState("");
  const [isMailChecked, setIsMailChecked] = useState(false);

  // 유효성 검사
  // 이메일 유효성 검사
  const checkEmail = e => {
    const regEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (regEmail.test(e.target.value) === false) {
      setEmailMess("이메일 형식으로 입력해주세요");
      setEmailError(true); // 에러발생
    } else {
      setEmailMess("");
      setEmailError(false);
    }
  };
  // 비밀번호 유효성 검사
  const checkPass = e => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
    if (regPass.test(e.target.value) === false) {
      setPassMess("영문, 숫자를 혼합하여 8~16자로 입력해주세요");
      setPassError(true); // 에러발생
    } else {
      setPassMess(" ");
      setPassError(false);
    }
  };

  // 비밀번호 일치여부 확인
  const checkPassSame = () => {
    if (passRef.current.value !== passSameRef.current.value) {
      setPassSameMess("비밀번호가 일치하지 않습니다");
      setPassSameError(true);
    } else {
      setPassSameMess(" ");
      setPassSameError(false);
    }
  };

  // 닉네임 유효성 확인
  const checkNick = e => {
    const regNick = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,8}$/;
    if (regNick.test(e.target.value) === false) {
      setNickMess("2~8자리의 문자로 입력해주세요");
      setNickError(true); // 에러발생
    } else {
      setNickMess(" ");
      setNickError(false);
    }
  };

  // 전화번호 유효성 확인
  const checkPhone = e => {
    const regPhone = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (regPhone.test(e.target.value) === false) {
      setPhoneMess("10~11자리 숫자만 입력해주세요");
      setPhoneError(true); // 에러발생
    } else {
      setPhoneMess(" ");
      setPhoneError(false);
    }
  };

  const checkCode = () => {
    if (codeRef.current.value !== code) {
      // 코드가 일치하지 않는다면
      setCodeError(true); // 에러 발생
      setCodeMess("인증번호가 일치하지 않습니다");
    } else if (codeRef.current.value === code) {
      setCodeError(false);
      setCodeMess(" ");
      setOpen(false);
      setIsMailChecked(true);
    }
  };

  const canUseMail = async () => {
    const result = await duplicateEmail(emailRef.current.value);

    if (result.message === "duplicate") {
      setEmailError("이미 가입된 이메일 입니다");
    } else if (result.message === "success") {
      // 코드번호 비교
      setcode(result.emailCode);
      setOpen(true); // 모듈창 오픈
    }
  };

  const canJoin = async () => {
    if (
      !emailError &&
      !phoneError &&
      !passError &&
      !passSameError &&
      !nickError &&
      !codeError &&
      isMailChecked
    ) {
      const userId = emailRef.current.value;
      const userPw = passRef.current.value;
      const userNick = nickRef.current.value;
      const userPhone = phoneRef.current.value;

      const res = await join({
        email: userId,
        nickname: userNick,
        password: userPw,
        tel: userPhone,
        auth: "USER"
      });

      if (res === "success") {
        navigate("/join/finish"); // 다음페이지로 이동xw
      }
    } else {
      alert("입력된 값을 다시 한번 확인해주세요");
    }
  };
  return (
    <div className="container flex">
      <div id="join" className="join flex justify-center">
        <div className="join_head flex align-center">
          <div className="join_head_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="join_head_title notoBold fs-28">회원가입</div>
        </div>
        <div className="join_social_txt notoMid fs-12">
          SNS계정으로 간편 로그인/회원가입
        </div>
        <div className="join_social_icons flex">
          <button className="join_social_icon_kakao" type="button">
            <img src={kakao} alt="kakao" />
          </button>
          <button className="join_social_icon_naver" type="button">
            <img src={naver} alt="naver" />
          </button>
          <button className="join_social_icon_google" type="button">
            <img src={google} alt="google" />
          </button>
        </div>
        <div className="divide" />
        <div className="join_input">
          <div className="join_input_email">
            <div className="join_input_email_title notoBold fs-15">이메일</div>
            <input
              required
              type="email"
              className="join_input_email_input notoMid fs-14"
              placeholder="이메일 형식으로 입력해주세요"
              ref={emailRef}
              onChange={checkEmail}
            />
            <button
              className="join_input_email_btn fs-14 notoBold"
              type="button"
              onClick={canUseMail}
            >
              이메일 인증하기
            </button>
            <div
              className={
                emailError
                  ? "join_input_email_check red notoMid fs-12"
                  : "join_input_email_check notoMid fs-12"
              }
            >
              {emailMess}
            </div>
            {open && (
              <div className="join_input_email_cert flex column align-center">
                <div className="join_input_email_cert_message notoMid fs-12">
                  이메일로 전송된 인증코드를 입력해주세요
                </div>
                <div className="join_input_email_cert_box">
                  <input
                    required
                    type="text"
                    className="join_input_email_cert_box_input notoReg fs-14"
                    placeholder="인증코드 6자리 입력"
                    ref={codeRef}
                  />
                </div>
                <button
                  className="join_input_email_cert_btn fs-14 notoBold flex justify-center align-center"
                  type="button"
                  onClick={checkCode}
                >
                  인증코드 확인
                </button>
                <div
                  className={
                    codeError
                      ? "join_input_email_cert_check red notoMid fs-10"
                      : "join_input_email_cert_check notoMid fs-10"
                  }
                >
                  {codeMess}
                </div>
                <div className="join_input_email_cert_resend notoMid fs-10">
                  이메일을 받지 못하셨나요?
                  <button
                    className="join_input_email_cert_resend_btn notoMid fs-10 "
                    type="button"
                  >
                    이메일 재전송하기
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="join_input_pw">
            <div className="join_input_pw_title notoBold fs-15">비밀번호</div>
            <form>
              <input
                required
                type="password"
                className="join_input_pw_input notoMid fs-14"
                placeholder="영문, 숫자를 혼합하여 8~16자로 입력해주세요"
                onChange={checkPass}
                ref={passRef}
                autoComplete="off"
              />
            </form>

            <div
              className={
                passError
                  ? "join_input_pw_check red notoMid fs-12"
                  : "join_input_pw_check notoMid fs-12"
              }
            >
              {passMess}
            </div>
          </div>
          <div className="join_input_pw2">
            <div className="join_input_pw2_title notoBold fs-15">
              비밀번호 확인
            </div>
            <form>
              <input
                required
                type="password"
                className="join_input_pw2_input notoMid fs-14"
                placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={checkPassSame}
                ref={passSameRef}
                autoComplete="off"
              />
            </form>

            <div
              className={
                passSameError
                  ? "join_input_pw2_check red notoMid fs-12"
                  : "join_input_pw2_check notoMid fs-12"
              }
            >
              {passSameMess}
            </div>
          </div>
          <div className="join_input_nickname">
            <div className="join_input_nickname_title notoBold fs-15">
              닉네임
            </div>
            <input
              required
              type="text"
              className="join_input_nickname_input notoMid fs-14"
              placeholder="2~8자리의 문자로 입력해주세요"
              onChange={checkNick}
              ref={nickRef}
            />
            <div
              className={
                nickError
                  ? "join_input_nickname_check red notoMid fs-12"
                  : "join_input_nickname_check notoMid fs-12"
              }
            >
              {nickMess}
            </div>
          </div>
          <div className="join_input_phone">
            <div className="join_input_phone_title notoBold fs-15">
              전화번호
            </div>
            <input
              required
              type="number"
              className="join_input_phone_input notoMid fs-14"
              placeholder="10~11자리의 숫자로 입력해주세요"
              onChange={checkPhone}
              ref={phoneRef}
            />
            <div
              className={
                phoneError
                  ? "join_input_phone_check red notoMid fs-12"
                  : "join_input_phone_check notoMid fs-12"
              }
            >
              {phoneMess}
            </div>
          </div>
        </div>
        <button
          className="join_btn fs-18 notoBold"
          type="button"
          onClick={canJoin}
        >
          회원가입 하기
        </button>
        <div className="join_ask notoMid fs-12 flex justify-space-between">
          이미 계정이 있으신가요?
          <div className="join_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
