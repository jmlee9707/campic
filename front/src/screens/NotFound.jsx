import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
        <div className="plan_login flex column align-center justify-center notoMid">
        <div className="plan_login_txt fs-32">404 not found</div>
        <Link to="/" className="plan_login_btn fs-18 notoMid">
            홈으로 이동
        </Link>
        </div>
    </div>
  );
}

export default NotFound;
