import React from "react";
import { Link } from "react-router-dom";
import "./FindPw.scss";

function FindPw() {
  const findPw = () => {
    window.location.href = "/findpw/auth";
  };
  return (
    <div className="container flex">
      <div className="findpw">
        <div className="findpw_title notoBold fs-28">비밀번호 찾기</div>
        <div className="findpw_sub1 notoBold fs-20">
          이메일을 입력해주세요!
        </div>
        <div className="findpw_sub2 notoMid fs-14">
          입력하신 이메일로 인증번호를 보내드릴게요.
        </div>
        <div className="findpw_email">
          <div className="findpw_email_title notoBold fs-15">이메일</div>
          <input
            type="email"
            className="findpw_email_input notoMid fs-14"
            placeholder="이메일 형식으로 입력해주세요"
          />
          <div className="findpw_email_check notoMid fs-12">
            이메일 형식으로 입력해주세요
          </div>
        </div>
        <button className="findpw_btn notoBold fs-18" type="button" onClick={ findPw }>
          인증번호 보내기
        </button>
        <div className="findpw_ask notoMid fs-12 flex justify-center">
          이미 계정이 있으신가요?
          <div className="findpw_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
        <div className="divide" />
        <div className="findpw_alert notoMid fs-11">
          <div className="findpw_alert_sub1">
            &middot; 인증 이메일은 발송 시점으로 부터 3분간 유효합니다.
          </div>
          <div className="findpw_alert_sub2">
            &middot; 인증 이메일 재발송 시 기존 인증코드는 무효처리되며, <br />
            &nbsp;&nbsp;&nbsp;새로 받은 인증코드로 인증해야 합니다.
          </div>
          <div className="findpw_alert_sub3">
            &middot; 이메일이 도착하지 않았다면 스펨메일함을 확인해주세요!
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPw;