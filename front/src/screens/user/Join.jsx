import React from "react";
import kakao from "@images/icon/kakao.svg";
import naver from "@images/icon/naver.svg";
import google from "@images/icon/google.svg";
import logo from "@images/logo/loco_icon_green.svg";
import "./Join.scss";
import { Link } from "react-router-dom";

function Join() {
  return (
    <div className="container flex">
      <div id="join" className="join flex justify-center">
        <div className="join_head flex align-center">
          <div className="join_head_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="join_head_title notoBold fs-28">회원가입</div>
        </div>
        <div className="join_social_txt notoMid fs-12">
          SNS계정으로 간편 로그인/회원가입
        </div>
        <div className="join_social_icons flex">
          <button className="join_social_icon_kakao" type="button">
            <img src={kakao} alt="kakao" />
          </button>
          <button className="join_social_icon_naver" type="button">
            <img src={naver} alt="naver" />
          </button>
          <button className="join_social_icon_google" type="button">
            <img src={google} alt="google" />
          </button>
        </div>
        <div className="divide" />
        <div className="join_input">
          <div className="join_input_email">
            <div className="join_input_email_title notoBold fs-15">이메일</div>
            <input
              type="email"
              className="join_input_email_input notoMid fs-14"
              placeholder="이메일 형식으로 입력해주세요"
            />
            <button
              className="join_input_email_btn fs-14 notoBold"
              type="button"
            >
              이메일 인증하기
            </button>
            <div className="join_input_email_check notoMid fs-12">
              이메일 형식으로 입력해주세요
            </div>
            <div className="join_input_email_cert">
              <div className="join_input_email_cert_message notoMid fs-12">
                이메일로 전송된 인증코드를 입력해주세요
              </div>
              <div className="join_input_email_cert_box">
                <input
                  type="text"
                  className="join_input_email_cert_box_input notoReg fs-14"
                  placeholder="인증코드 6자리 입력"
                />
              </div>
              <div className="join_input_email_cert_resend notoMid fs-10">
                이메일을 받지 못하셨나요?
                <button
                  className="join_input_email_cert_resend_btn notoMid fs-10"
                  type="button"
                >
                  이메일 재전송하기
                </button>
              </div>
            </div>
          </div>
          <div className="join_input_pw">
            <div className="join_input_pw_title notoBold fs-15">비밀번호</div>
            <input
              type="text"
              className="join_input_pw_input notoMid fs-14"
              placeholder="영문, 숫자를 혼합하여 8~16자로 입력해주세요"
            />
            <div className="join_input_pw_check notoMid fs-12">
              영문, 숫자를 혼합하여 8~16자로 입력해주세요
            </div>
          </div>
          <div className="join_input_pw2">
            <div className="join_input_pw2_title notoBold fs-15">
              비밀번호 확인
            </div>
            <input
              type="text"
              className="join_input_pw2_input notoMid fs-14"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            <div className="join_input_pw2_check notoMid fs-12">
              비밀번호가 일치하지 않습니다
            </div>
          </div>
          <div className="join_input_nickname">
            <div className="join_input_nickname_title notoBold fs-15">
              닉네임
            </div>
            <input
              type="text"
              className="join_input_nickname_input notoMid fs-14"
              placeholder="2~8자리의 문자로 입력해주세요"
            />
            <div className="join_input_nickname_check notoMid fs-12">
              2~8자리의 문자로 입력해주세요
            </div>
          </div>
          <div className="join_input_phone">
            <div className="join_input_phone_title notoBold fs-15">
              전화번호
            </div>
            <input
              type="number"
              className="join_input_phone_input notoMid fs-14"
              placeholder="10~11자리의 숫자로 입력해주세요"
            />
            <div className="join_input_phone_check notoMid fs-12">
              10~11자리의 숫자로 입력해주세요
            </div>
          </div>
        </div>
        <button className="join_btn fs-18 notoBold" type="button">
          회원가입 하기
        </button>
        <div className="join_ask notoMid fs-12 flex justify-space-between">
          이미 계정이 있으신가요?
          <div className="join_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
