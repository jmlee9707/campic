import React from "react";
import logo from "@images/logo/logo_icon_green.svg";
import "./Drop.scss";

function Drop() {
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
            type="text"
            className="drop2_input notoMid fs-14"
            placeholder="탈퇴를 위해선 비밀번호를 입력하세요"
          />
          <button className="drop2_btn notoBold fs-18" type="button">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Drop;
