import React from "react";
import { Link } from "react-router-dom";
import logo from "@images/logo/logo_icon_green.svg";
import "./InfoEdit.scss";

function InfoEdit() {
  const infoEdit = () => {
    window.location.href = "/infoedit";
  };
  const infoToPw = () => {
    window.location.href = "/infoedit/pwch";
  };
  return (
    <div className="container flex justify-center">
      <div className="infoedit">
        <div className="infoedit_top flex justify-center">
          <div className="infoedit_top_title notoBold fs-28">개인정보 수정</div>
          <img src={logo} alt="Profile_Image" />
          <button className="infoedit_top_btn notoBold fs-15" type="button">
            프로필 사진 변경
          </button>
          <div className="divide" />
        </div>
        <div className="infoedit_box">
          <div className="infoedit_box_title notoBold fs-15">이메일</div>
          <input
            type="email"
            className="infoedit_box_input  notoMid fs-14"
            value="qkrgks378@naver.com"
            readOnly
          />
        </div>
        <div className="infoedit_box">
          <div className="infoedit_box_title notoBold fs-15">닉네임</div>
          <input
            type="text"
            className="infoedit_box_input notoMid fs-14"
            placeholder="2~8자리의 문자로 입력해주세요"
          />
        </div>
        <div className="infoedit_box">
          <div className="infoedit_box_title notoBold fs-15">전화번호</div>
          <input
            type="number"
            className="infoedit_box_input notoMid fs-14"
            placeholder="10~11자리의 숫자로 입력해주세요"
          />
        </div>
        <div className="infoedit_box">
          <div className="infoedit_box_title notoBold fs-15">
            소셜 로그인 여부
          </div>
          <input
            type="text"
            className="infoedit_box_input notoMid fs-14"
            value="카카오톡"
            readOnly
          />
        </div>
        <div className="infoedit_btn flex justify-center">
          <button className="notoBold fs-18" type="button" onClick={infoEdit}>
            수정 완료
          </button>
          <button className="notoBold fs-18" type="button" onClick={infoToPw}>
            비밀번호 수정
          </button>
          <div className="infoedit_btn_drop notnoMid fs-12">
            <Link to="/mypage/drop">탈퇴하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoEdit;
