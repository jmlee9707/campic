import React from "react";
import "./FindPwCh.scss";

function FindPwCh() {
  return (
    <div className="container flex">
      <div className="findpwch">
        <div className="findpwch_title notoBold fs-28">비밀번호 재설정</div>
        <div className="findpwch_sub notoBold fs-20">
          새로운 비밀번호를 설정해주세요!
        </div>
        <div className="findpwch_pw">
          <div className="findpwch_pw_title notoBold fs-15">비밀번호</div>
          <input
            type="text"
            className="findpwch_pw_input notoMid fs-13"
            placeholder="영문, 숫자를 혼합하여 8~16자리로 입력해주세요"
          />
          <div className="findpwch_pw_check notoMid fs-12">
            영문, 숫자를 혼합하여 8~16자리로 입력해주세요.
          </div>
        </div>
        <div className="findpwch_pw2">
          <div className="findpwch_pw2_title notoBold fs-15">비밀번호 확인</div>
          <input
            type="text"
            className="findpwch_pw2_input notoMid fs-13"
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
          <div className="findpwch_pw2_check notoMid fs-12">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>
        <button className="findpwch_btn notoBold fs-18" type="button">확인</button>
      </div>
    </div>
  );
}
export default FindPwCh;