import React from "react";
import { useNavigate } from "react-router-dom";
import checkCircle from "@images/icon/check_circle.svg";
import { useSelector, useDispatch } from "react-redux";
import { reset, selectEmail } from "@store/find";
import "./FindIdFinish.scss";

function FindIdFinish() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector(selectEmail);

  const moveFindPw = () => {
    dispatch(reset());
    navigate("/findpw");
  };
  const moveLogin = () => {
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div className="container flex justify-center">
      <div id="findidfin" className="findidfin flex justify-center">
        <div className="findidfin_img">
          <img
            src={checkCircle}
            alt="checkBox"
            className="findidfin_img_checkbox"
          />
        </div>
        <div className="findidfin_remind notoBold fs-28">잊지마세요!</div>
        <div className="findidfin_info notoBold fs-16 flex align-center justify-center">
          <div>찾으시는 이메일은</div>
          <div className="findidfin_info_email">{userId}</div>
          <div>입니다.</div>
        </div>
        <div className="findidfin_pw">
          <button
            type="button"
            className="findidfin_pw_btn flex align-center justify-center notoBold fs-18"
            onClick={moveFindPw}
          >
            비밀번호 찾기
          </button>
        </div>
        <div className="findidfin_login">
          <button
            type="button"
            className="findidfin_login_btn flex align-center justify-center notoBold fs-18"
            onClick={moveLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
export default FindIdFinish;
