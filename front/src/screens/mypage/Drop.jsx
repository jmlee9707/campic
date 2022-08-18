import React, { useRef } from "react";
import "./Drop.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, selectEmail, selectProfile } from "@store/user";
import { checkPw, dropUser } from "@apis/user";
import PlzLogin from "@screens/PlzLogin"

function Drop() {
  const userId = useSelector(state => state.user.email);
  const Profile = useSelector(selectProfile);
  const pwRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeEmail = useSelector(selectEmail);

  const checkDrop = async () => {
    const pw = pwRef.current.value;
    const res = await checkPw({ email: storeEmail, password: pw });
    if (res === "success") {
      await dropUser(storeEmail);
      sessionStorage.clear();
      dispatch(reset());
      navigate("/drop/finish");
    } else {
      console.log("failed");
    }
  };

  return (
    <div className="container flex justify-center">
      {userId !== null && <div id="drop" className="drop">
        <div id="drop1" className="drop1 flex justify-center">
          <div className="drop1_title notoBold fs-28">탈퇴하기</div>
          <img src={Profile.profileImg} alt="Profile_Image" className="drop1_img" />
          <div className="divide" />
        </div>
        <div id="drop2" className="drop2">
          <div className="drop2_title notoBold fs-15">비밀번호</div>
          <input
            ref={pwRef}
            type="password"
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
      </div>}
      {userId === null && <PlzLogin/>}
    </div>
  );
}
export default Drop;
