import React, { useRef } from "react";
import logo from "@images/logo/logo_icon_green.svg";
import "./Drop.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../store/user";
import { checkPw } from "../../apis/user";

function Drop() {
  const pwRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkDrop = async () => {
    const pw = pwRef.current.value;
    const email = sessionStorage.getItem("email");
    const res = await checkPw({ email, password: pw });
    console.log("1111");
    if (res === "success") {
      sessionStorage.clear();
      dispatch(reset());
      navigate("/drop/finish");
    } else {
      console.log("failed");
    }
  };

  return (
    <div className="container flex justify-center">
      <div id="drop" className="drop">
        <div id="drop1" className="drop1 flex justify-center">
          <div className="drop1_title notoBold fs-28">탈퇴하기</div>
          <img src={logo} alt="Profile_Image" className="drop1_img" />
          <div className="divide" />
        </div>
        <div id="drop2" className="drop2">
          <div className="drop2_title notoBold fs-15">비밀번호</div>
          <input
            ref={pwRef}
            type="text"
            className="drop2_input notoMid fs-14"
            placeholder="탈퇴를 위해선 비밀번호를 입력하세요"
          />
          <button
            className="drop2_btn notoBold fs-18"
            type="button"
            onClick={checkDrop}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Drop;
