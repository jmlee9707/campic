import React from "react";
import logo from "@images/logo/loco_icon_green.svg";
import "./PwCh.scss";

function PwCh() {
  return (
    <div className="container flex justify-center">
      <div id="pwch" className="pwch">
        <div id="pwch1" className="pwch1 flex justify-center">
          <div className="pwch1_title notoBold fs-28">비밀번호 수정</div>
          <img src={logo} alt="Profile_Image" className="pwch1_img" />
          <div className="divide" />
        </div>
        <div id="pwch2" className="pwch2">
          <div className="pwch2_title notoBold fs-15">비밀번호</div>
          <input
            type="text"
            className="pwch2_input notoMid fs-14"
            placeholder="본인확인을 위해 비밀번호를 입력하세요"
          />
          <button className="pwch2_btn notoBold fs-18" type="button">확인</button>
        </div>
      </div>
    </div>
  );
}
export default PwCh;