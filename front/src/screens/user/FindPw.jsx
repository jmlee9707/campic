import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FindPw.scss";
import { useDispatch } from "react-redux";
import { setEmail } from "@store/find";
import { findPw } from "@apis/user";

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const [subTitle, setSubTitle] = useState("이메일을 입력해주세요!");

  const [next, setNext] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailMess, setEmailMess] = useState("");
  const [inputName, setInputName] = useState("이메일");
  const [codeMess, setCodeMess] = useState("");

  const emailRef = useRef();
  const codeRef = useRef();
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");

  const [tick, setTick] = useState(0);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    let countdown = null;
    if (tick > 0) {
      countdown = setInterval(() => {
        setTick(tick - 1);
      }, 1000);
    } else if (tick <= 0) {
      setFlag(false);
    }
    return () => clearInterval(countdown);
  }, [tick]);

  const checkEmail = e => {
    const regEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (regEmail.test(e.target.value) === false) {
      setEmailMess("이메일 형식으로 입력해주세요");
      setEmailError(true); 
    } else {
      setEmailMess("");
      setEmailError(false);
    }
  };

  const isJoined = async () => {
    if (!emailError) {
      const res = await findPw(emailRef.current.value);
      if (res.message === "success") {
        setUserId(emailRef.current.value); 
        setCode(res.emailCode); 
        setSubTitle("인증번호를 입력해주세요!");
        setInputName("인증번호");
        setNext(true);
        setTick(180);
        setFlag(true);
      } else if (res.message === "fail") {
        setEmailError("존재하지 않는 이메일 입니다");
      }
    }
  };

  const reSend = async () => {
    const res = await findPw(userId);
    if (res.message === "success") {
      setCode(res.emailCode); 
      setSubTitle("인증번호를 입력해주세요!");
      setInputName("인증번호");
      setNext(true);
      setTick(180);
      setFlag(true);
    } else if (res.message === "fail") {
      setEmailError("존재하지 않는 이메일 입니다");
    }
  };

  const checkCode = () => {
    if (code === codeRef.current.value) {
      dispatch(setEmail({ email: userId }));
      navigate("/findpw/change");
    } else {
      setCodeMess("잘못된 인증번호 입니다");
    }
  };

  return (
    <div className="container flex">
      <div className="findpw">
        <div className="findpw_title notoBold fs-28">비밀번호 찾기</div>
        <div className="findpw_sub1 notoBold fs-20">{subTitle}</div>
        {!next && (
          <div className="findpw_sub2 notoMid fs-14">
            입력하신 이메일로 인증번호를 보내드릴게요
          </div>
        )}
        {next && (
          <div className="findpw_sub2 notoMid fs-14">
            입력하신 이메일이 {userId} 가 맞으신가요?
          </div>
        )}
        <div className="findpw_email">
          <div className="findpw_email_title notoBold fs-15">{inputName}</div>
          {!next && (
            <>
              <input
                ref={emailRef}
                type="email"
                className="findpw_email_input notoMid fs-14"
                placeholder="이메일 형식으로 입력해주세요"
                onChange={checkEmail}
              />
              <div className="findpw_email_check notoMid fs-12">
                {emailMess}
              </div>
            </>
          )}
          {next && (
            <>
              <input
                type="text"
                className="findpw_email_input notoMid fs-14"
                placeholder="인증번호를 입력해주세요"
                ref={codeRef}
              />
              <div className="findpw_email_check notoMid fs-12">{codeMess}</div>
            </>
          )}
        </div>
        {!flag && !next && (
          <button
            className="findpw_btn notoBold fs-18"
            type="button"
            onClick={isJoined}
          >
            인증번호 보내기
          </button>
        )}
        {flag && next && (
          <button
          className="findpw_btn notoBold fs-18"
          type="button"
          onClick={checkCode}
          >
            확인
          </button>
        )}
        {!flag && next && (
          <button
          className="findpw_btn notoBold fs-18"
          type="button"
          onClick={reSend}
          >
            인증번호 재전송
          </button>
        )}        
        {flag && <div className="fs-12 notoMid flex justify-center align-center"> 남은 시간 : { Math.floor(tick / 60) > 0 ? `${Math.floor(tick / 60)} 분` : '' } {tick % 60 } 초 </div>}
        <div className="findpw_ask notoMid fs-12 flex justify-center">
          이미 계정이 있으신가요?
          <div className="findpw_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
        <div className="divide" />
        <div className="findpw_alert flex column  align-center justify-center notoMid fs-11">
          <div className="findpw_alert_sub1">
            &middot; 인증 이메일은 발송 시점으로 부터 3분간 유효합니다.
          </div>
          <div className="findpw_alert_sub2">
            &middot; 인증 이메일 재발송 시 기존 인증코드는 무효처리되며, 새로{" "}
            <br />
            받은 인증코드로 인증해야 합니다.
          </div>
          <div className="findpw_alert_sub3">
            &middot; 이메일이 도착하지 않았다면 스펨메일함을 확인해주세요!
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPw;
