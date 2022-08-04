import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../store/user";
import { changePw } from "../../apis/user";

import "./FindPwCh.scss";

function FindPwCh() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.value.email);

  const passRef = useRef();
  const passSameRef = useRef();

  const [passError, setPassError] = useState(false);
  const [passSameError, setPassSameError] = useState(false);

  const [passMess, setPassMess] = useState("");
  const [passSameMess, setPassSameMess] = useState("");

  // 유효성 검사
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

  const canChange = async () => {
    if (!passError && !passSameError) {
      const res = await changePw({
        email: userId,
        password: passRef.current.value
      });
      if (res === "success") {
        dispatch(reset());
        navigate("/findpw/finish");
      }
    }
  };
  return (
    <div className="container flex">
      <div className="findpwch">
        <div className="findpwch_title notoBold fs-28">비밀번호 재설정</div>
        <div className="findpwch_sub notoBold fs-20">
          새로운 비밀번호를 설정해주세요!
        </div>
        <div className="findpwch_pw">
          <div className="findpwch_pw_title notoBold fs-15">비밀번호</div>
          <form>
            <input
              ref={passRef}
              type="password"
              className="findpwch_pw_input notoMid fs-13"
              placeholder="영문, 숫자를 혼합하여 8~16자리로 입력해주세요"
              onChange={checkPass}
            />
            <div className="findpwch_pw_check notoMid fs-12">{passMess}</div>
          </form>
        </div>
        <div className="findpwch_pw2">
          <div className="findpwch_pw2_title notoBold fs-15">비밀번호 확인</div>
          <form>
            <input
              ref={passSameRef}
              type="password"
              className="findpwch_pw2_input notoMid fs-13"
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={checkPassSame}
            />
            <div className="findpwch_pw2_check notoMid fs-12">
              {/* 비밀번호가 일치하지 않습니다. */}
              {passSameMess}
            </div>
          </form>
        </div>
        <button
          className="findpwch_btn notoBold fs-18"
          type="button"
          onClick={canChange}
        >
          확인
        </button>
      </div>
    </div>
  );
}
export default FindPwCh;
