import React, { useState, useRef } from "react";
import logo from "@images/logo/logo_icon_green.svg";
import "./PwEdit.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePw } from "../../apis/user";

import { selectProfile } from '../../store/user';

function PwEdit() {
  const navigate = useNavigate();
  const passRef = useRef();
  const passSameRef = useRef();

  const Profile = useSelector(selectProfile);

  const [passMess, setPassMess] = useState("");
  const [passSameMess, setPassSameMess] = useState("");
  const [passError, setPassError] = useState(false);
  const [passSameError, setPassSameError] = useState(false);

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
  const checkPassSame =  () => {
    if (passRef.current.value !== passSameRef.current.value) {
      setPassSameMess("비밀번호가 일치하지 않습니다");
      setPassSameError(true);
    } else {
      setPassSameMess(" ");
      setPassSameError(false);
    }
  };

  const canEdit = async () => {
    if (!passError && !passSameError) {
      try {
        const res = await changePw({ email: Profile.email, password: passRef.current.value });
        navigate("/infoedit/pwedit");
        if (res !=='success') {
          throw new Error('canEdit err')
        }
      } catch {
        setPassMess("관리자에게 문의하세요");
        setPassError(true);
      }
    }
  };
  
  return (
    <div className="container column flex align-center justify-center">
      <div className="pwedit">
        <div className="pwedit_top flex column justify-center align-center">
          <div className="pwedit_top_title notoBold fs-28">비밀번호 수정</div>
          <img src={logo} alt="Profile_Image" className="pwedit1_img" />
          <div className="divide" />
        </div>

        <div className="flex column align-center justify-center">
          <div className="pwedit_content">
            <div className="pwedit_content_title notoBold fs-15">
              새로운 비밀번호
            </div>
            <form>
              <input
                type="password"
                className="pwedit_content_input notoMid fs-14"
                placeholder="영문, 숫자를 혼합하여 8~16자로 입력해주세요"
                onChange={checkPass}
                ref={passRef}
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
          <div className="pwedit_content">
            <div className="pwedit_content_title notoBold fs-15">
              새로운 비밀번호 확인
            </div>
            <form>
              <input
                type="password"
                className="pwedit_content_input notoMid fs-14"
                placeholder="비밀번호를 한번더 입력해주세요"
                onChange={checkPassSame}
                ref={passSameRef}
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
          <button
            className="pwedit_btn notoBold fs-18"
            type="button"
            onClick={canEdit}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
export default PwEdit;
