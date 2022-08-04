import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FindPw.scss";
import { useDispatch } from "react-redux";
import { findPw as find } from "../../store/user";
import { findPw } from "../../apis/user";

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // action 보내기

  // message setting
  const [subTitle, setSubTitle] = useState("이메일을 입력해주세요!");

  // page, compinent 진행
  const [next, setNext] = useState(false);

  // 오류 확인
  const [emailError, setEmailError] = useState(false);
  // const [codeError, setCodeError] = useState(false);
  const [emailMess, setEmailMess] = useState("");
  const [inputName, setInputName] = useState("이메일");
  const [codeMess, setCodeMess] = useState("");

  // ref 값
  const emailRef = useRef();
  const codeRef = useRef();
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");

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

  const isJoined = async () => {
    if (!emailError) {
      const res = await findPw(emailRef.current.value);
      if (res.message === "success") {
        setUserId(emailRef.current.value); // 아이디값 저장
        setCode(res.emailCode); // code 입력
        setSubTitle("인증번호를 입력해주세요!");
        setInputName("인증번호");
        setNext(true);
      } else if (res.message === "fail") {
        setEmailError("존재하지 않는 이메일 입니다");
      }
    }
  };

  const checkCode = () => {
    if (code === codeRef.current.value) {
      dispatch(find({ email: userId }));
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
        {/* 첫번째 컴포넌트  */}
        {!next && (
          <div className="findpw_sub2 notoMid fs-14">
            입력하신 이메일로 인증번호를 보내드릴게요
          </div>
        )}
        {/* 두번째 컴포넌트  */}
        {next && (
          <div className="findpw_sub2 notoMid fs-14">
            입력하신 이메일이 {userId} 가 맞으신가요?
          </div>
        )}
        <div className="findpw_email">
          <div className="findpw_email_title notoBold fs-15">{inputName}</div>
          {/* 첫번째 컴포넌트  */}
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
          {/* 두번째 컴포넌트  */}
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
        {/* 첫번째 컴포넌트  */}
        {!next && (
          <button
            className="findpw_btn notoBold fs-18"
            type="button"
            onClick={isJoined}
          >
            인증번호 보내기
          </button>
        )}
        {/* 두번째 컴포넌트  */}
        {next && (
          <button
            className="findpw_btn notoBold fs-18"
            type="button"
            onClick={checkCode}
          >
            확인
          </button>
        )}
        <div className="findpw_ask notoMid fs-12 flex justify-center">
          이미 계정이 있으신가요?
          <div className="findpw_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
        <div className="divide" />
        <div className="findpw_alert notoMid fs-11">
          <div className="findpw_alert_sub1">
            &middot; 인증 이메일은 발송 시점으로 부터 3분간 유효합니다.
          </div>
          <div className="findpw_alert_sub2">
            &middot; 인증 이메일 재발송 시 기존 인증코드는 무효처리되며, <br />
            &nbsp;&nbsp;&nbsp;새로 받은 인증코드로 인증해야 합니다.
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
