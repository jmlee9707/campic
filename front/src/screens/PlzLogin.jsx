import React from "react";
import { Link } from "react-router-dom";

function PlzLogin() {
  return (
    <div>
      <div className="plan_login flex column align-center justify-center notoMid">
        <div className="plan_login_txt fs-32">로그인 후 이용하세요!</div>
        <Link to="/login" className="plan_login_btn fs-18 notoMid">
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

export default PlzLogin;
