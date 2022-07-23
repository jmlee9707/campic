import React from "react";
import { Link } from "react-router-dom";
import logo from "@images/logo/loco_icon_green.svg";
import "./InfoEdit.scss";

function InfoEdit() {
  return (
    <div className="container flex justify-center">
      <div id="infoedit" className="infoedit">
        <div id="infoedit1" className="infoedit1 flex justify-center">
          <div className="infoedit1_title notoBold fs-28">개인정보 수정</div>
          <img src={logo} alt="Profile_Image" className="infoedit1_img" />
          <button className="infoedit1_btn notoBold fs-15" type="button">프로필 사진 변경</button>
          <div className="divide" />
        </div>
        <div id="infoedit2" className="infoedit2">
          <div className="infoedit2_title notoBold fs-15">이메일</div>
          <input
            type="email"
            className="infoedit2_input notoMid fs-14"
            value="qkrgks378@naver.com" readOnly
          />
        </div>
        <div id="infoedit3" className="infoedit3">
          <div className="infoedit3_title notoBold fs-15">닉네임</div>
          <input
            type="text"
            className="infoedit3_input notoMid fs-14"
            placeholder="2~8자리의 문자로 입력해주세요"
          />
        </div>
        <div id="infoedit4" className="infoedit4">
          <div className="infoedit4_title notoBold fs-15">전화번호</div>
          <input
            type="number"
            className="infoedit4_input notoMid fs-14"
            placeholder="10~11자리의 숫자로 입력해주세요"
          />
        </div>
        <div id="infoedit5" className="infoedit5">
          <div className="infoedit5_title notoBold fs-15">소셜 로그인 여부</div>
          <input
            type="text"
            className="infoedit5_input notoMid fs-14"
            value="카카오톡" readOnly
          />
        </div>
        <div id="infoedit6" className="infoedit6 flex justify-center">
          <button className="infoedit6_btn1 notoBold fs-18" type="button">수정 완료</button>
          <button className="infoedit6_btn2 notoBold fs-18" type="button">비밀번호 수정</button>
          <div className="infoedit6_drop notnoMid fs-12"><Link to="/drop">탈퇴하기</Link></div>
        </div>
      </div>
    </div>
  );
}
export default InfoEdit;