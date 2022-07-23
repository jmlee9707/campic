import React from "react";
import logo from "@images/logo/loco_icon_green.svg";
import "./PwEdit.scss";

function PwEdit() {
  return (
    <div className="container flex justify-center">
      <div id="pwedit" className="pwedit">
        <div id="pwedit1" className="pwedit1 flex justify-center">
          <div className="pwedit1_title notoBold fs-28">비밀번호 수정</div>
          <img src={logo} alt="Profile_Image" className="pwedit1_img" />
          <div className="divide" />
        </div>
        <div id="pwedit2" className="pwedit2">
          <div className="pwedit2_title notoBold fs-15">새로운 비밀번호</div>
          <input
            type="text"
            className="pwedit2_input notoMid fs-14"
            placeholder="10~11자리의 숫자로 입력해주세요"
          />
        </div>
        <div id="pwedit3" className="pwedit3">
          <div className="pwedit3_title notoBold fs-15">새로운 비밀번호 확인</div>
          <input
            type="text"
            className="pwedit3_input notoMid fs-14"
            placeholder="비밀번호를 한번더 입력해주세요"
          />
          <button className="pwedit3_btn notoBold fs-18" type="button">수정 완료</button>
        </div>
      </div>
    </div>
  );
}
export default PwEdit;