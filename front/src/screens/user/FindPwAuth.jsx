import React from "react";
import "./FindPwAuth.scss";

function FindPwAuth() {
  return (
    <div className="container flex">
      <div className="findpwauth">
        <div className="findpwauth_title notoBold fs-28">비밀번호 찾기</div>
        <div className="findpwauth_sub1 notoBold fs-20">
          인증번호를 입력해주세요!
        </div>
        <div className="findpwauth_sub2 notoMid fs-14">
          qkrgks378@gmail.com이 맞으신가요?
        </div>
        <div className="findpwauth_email">
          <div className="findpwauth_email_title notoBold fs-15">인증번호</div>
          <input
            type="email"
            className="findpwauth_email_input notoMid fs-14"
            placeholder="인증번호를 입력해주세요"
          />
        </div>
        <button className="findpwauth_btn notoBold fs-18" type="button">
          확인
        </button>
        <div className="findpwauth_ask notoMid fs-12 flex justify-center align-center">
          인증번호를 받지 못하셨나요?
          <button className="findpwauth_ask_resend notoMid fs-12" type="button">재전송</button>
        </div>
        <div className="divide" />
        <div className="findpwauth_alert notoMid fs-11">
          <div className="findpwauth_alert_sub1">
            &middot; 인증 이메일은 발송 시점으로 부터 3분간 유효합니다.
          </div>
          <div className="findpwauth_alert_sub2">
            &middot; 인증 이메일 재발송 시 기존 인증코드는 무효처리되며, <br />
            &nbsp;&nbsp;&nbsp;새로 받은 인증코드로 인증해야 합니다.
          </div>
          <div className="findpwauth_alert_sub3">
            &middot; 이메일이 도착하지 않았다면 스펨메일함을 확인해주세요!
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPwAuth;