import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from '@store/find';
import { findId } from "@apis/user";
import "./FindId.scss";

function FindId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const phoneRef = useRef();
  const [phoneError, setPhoneError] = useState(false);
  const [phoneMess, setPhoneMess] = useState("");

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

  const canFind = async () => {
    if (!phoneError) {
      const res = await findId(phoneRef.current.value);
      if (res.message === "success") {
        // console.log(`${res.email}이메일!`);
        dispatch(setEmail({ email: res.email }));
        // console.log("디스패치 가능");
        navigate("/findid/finish");
      }
    }
  };

  return (
    <div className="container flex">
      <div className="findid">
        <div className="findid_title notoBold fs-28">아이디 찾기</div>
        <div className="findid_sub1 notoBold fs-20">
          전화번호를 입력해주세요!
        </div>
        <div className="findid_sub2 notoMid fs-14">
          확인 후 아이디를 알려드릴게요 :)
        </div>
        <div className="findid_phone">
          <div className="findid_phone_title notoBold fs-15">전화번호</div>
          <input
            ref={phoneRef}
            type="text"
            className="findid_phone_input notoMid fs-14"
            placeholder="10~11자리의 숫자로 입력해주세요"
            onChange={checkPhone}
          />
          <div className="findid_phone_check notoMid fs-12">{phoneMess}</div>
        </div>
        <button
          className="findid_btn notoBold fs-18"
          type="button"
          onClick={canFind}
        >
          아이디 찾기
        </button>
        <div className="findid_ask notoMid fs-12 flex justify-center">
          이미 계정이 있으신가요?
          <div className="findid_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindId;
