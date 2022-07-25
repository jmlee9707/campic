import React from "react";
import { Link } from "react-router-dom";
import checkCircle from "@images/icon/check_circle.svg";
import "./FindIdFinish.scss";

function FindIdFinish() {
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
          <div className="findidfin_info_email">qkrgks378@naver.com</div>
          <div>입니다.</div>
        </div>
        <div className="findidfin_pw">
          <Link
            className="findidfin_pw_btn flex align-center justify-center notoBold fs-18"
            to="/findpw"
          >
            비밀번호 찾기
          </Link>
        </div>
        <div className="findidfin_login">
          <Link
            className="findidfin_login_btn flex align-center justify-center notoBold fs-18"
            to="/login"
          >
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
export default FindIdFinish;
