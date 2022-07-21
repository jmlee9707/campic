import React from "react";
import { Link } from "react-router-dom";
import checkCircle from "@images/icon/check_circle.svg";
import "./JoinFinish.scss";

function JoinFinish() {
  return (
    <div className="container flex justify-center">
      <div id="welcome" className="welcome flex justify-center">
        <div className="welcome_img">
          <img
            src={checkCircle}
            alt="checkBox"
            className="welcome_img_checkbox"
          />
        </div>
        <div className="welcome_done notoBold fs-28">회원가입 완료!</div>
        <div className="welcome_adv notoReg fs-16 flex align-center justify-center">
          <div>캠핑이 필요할 때! campic!</div>
          <div>지금부터 campic의</div>
          <div>모든 서비스를 이용하실 수 있습니다.</div>
        </div>
        <div className="welcome_home">
          <Link
            className="welcome_home_btn flex align-center justify-center notoBold fs-18"
            to="/"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JoinFinish;