import React from "react";
import { Link } from "react-router-dom";
import checkCircle from "@images/icon/check_circle.svg";
import "./FindPwFinish.scss";

function FindPwFinish() {
  return (
    <div className="container flex justify-center">
      <div id="findpwfin" className="findpwfin flex justify-center">
        <div className="findpwfin_img">
          <img
            src={checkCircle}
            alt="checkBox"
            className="findpwfin_img_checkbox"
          />
        </div>
        <div className="findpwfin_remind notoBold fs-28">비밀번호 재설정 완료!</div>
        <div className="findpwfin_info notoBold fs-16 flex align-center justify-center">
          <div>재설정한 비밀번호로</div>
          <div>로그인 해주세요</div>
        </div>
        <div className="findpwfin_pw">
          <Link
            className="findpwfin_home_btn flex align-center justify-center notoBold fs-18"
            to="/"
          >
            HOME
          </Link>
        </div>
        <div className="findpwfin_login">
          <Link
            className="findpwfin_login_btn flex align-center justify-center notoBold fs-18"
            to="/login"
          >
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
export default FindPwFinish;