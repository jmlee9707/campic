import React, { useRef, useState } from "react";
import "./PwCh.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProfile } from "@store/user";
import { checkPw } from "@apis/user";
import PlzLogin from "@screens/PlzLogin" 

function PwCh() {
  const userId = useSelector(state => state.user.email);
  const navigate = useNavigate();

  const Profile = useSelector(selectProfile);

  const [passError, setPassError] = useState(false);
  const [passMess, setPassMess] = useState("");
  const passRef = useRef();

  const checkPass = e => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
    if (regPass.test(e.target.value) === false) {
      setPassMess("영문, 숫자를 혼합하여 8~16자로 입력해주세요");
      setPassError(true); 
    } else {
      setPassMess(" ");
      setPassError(false);
    }
  };

  const canEditPw = async () => {
    try {
      const res = await checkPw({
        email: Profile.email,
        password: passRef.current.value
      });
      navigate("/infoedit/pwedit");
      if (res !== "success") {
        throw new Error("caEditPw err");
      }
    } catch {
      setPassMess("비밀번호가 일치하지 않습니다");
      setPassError(true);
    }
  };
  return (
    <div className="container flex justify-center">
      {userId !== null && <div className="pwch flex column">
        <div className="pwch_top flex column align-center justify-center">
          <div className="pwch_top_title notoBold fs-28">비밀번호 수정</div>
          <img src={Profile.profileImg} alt="Profile_Image" className="pwch1_img" />
          <div className="divide" />
        </div>

        <div className="flex align-center justify-center">
          <div className="pwch_content">
            <div className="pwch_content_title notoBold fs-15">비밀번호</div>
            <input
              ref={passRef}
              type="password"
              onChange={checkPass}
              className="pwch_content_input notoMid fs-14"
              placeholder="본인확인을 위해 비밀번호를 입력하세요"
            />
            <div
              className={
                passError
                  ? "pwch_content_input_check red notoMid fs-12"
                  : "pwch_content_input_check notoMid fs-12"
              }
            >
              {passMess}
            </div>
            <button
              className="pwch_content_btn notoBold fs-18"
              type="button"
              onClick={canEditPw}
            >
              확인
            </button>
          </div>
        </div>
      </div>}
      {userId === null && <PlzLogin/>}
    </div>
  );
}
export default PwCh;
