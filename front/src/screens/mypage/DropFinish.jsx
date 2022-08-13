import React from "react";
import { Link } from "react-router-dom";
import checkCircle from "@images/icon/check_circle.svg";
import "./DropFinish.scss";

function DropFinish() {
  return (
    <div className="container flex justify-center">
      <div id="dropfin" className="dropfin flex justify-center">
        <div className="dropfin_img">
          <img
            src={checkCircle}
            alt="Check_Box"
            className="dropfin_img_checkbox"
          />
        </div>
        <div className="dropfin_remind notoBold fs-28">탈퇴 완료!</div>
        <div className="dropfin_info notoBold fs-16 flex align-center justify-center">
          <div>캠핑이 필요할 때</div>
          <div>언제든지 캠픽으로 돌아오세요!</div>
          <div>지금까지 캠픽이었습니다</div>
        </div>
        <div className="dropfin_pw">
          <Link
            className="dropfin_pw_btn flex align-center justify-center notoBold fs-18"
            to="/"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DropFinish;