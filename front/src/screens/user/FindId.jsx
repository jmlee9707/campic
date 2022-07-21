import React from "react";
import { Link } from "react-router-dom";
import "./FindId.scss";

function FindId() {
  return (
    <div className="container flex">
      <div className="findid">
        <div className="findid_title notoBold fs-28">아이디 찾기</div>
        <div className="findid_sub1 notoBold fs-20">
          전화번호를 입력해주세요!
        </div>
        <div className="findid_sub2 notoMid fs-14">
          확인 후 아이디를 알려드릴게요 :)
        </div>
        <div className="findid_phone">
          <div className="findid_phone_title notoBold fs-15">전화번호</div>
          <input
            type="number"
            className="findid_phone_input notoMid fs-14"
            placeholder="10~11자리의 숫자로 입력해주세요"
          />
          <div className="findid_phone_check notoMid fs-12">
            10~11자리의 숫자로 입력해주세요
          </div>
        </div>
        <button className="findid_btn notoBold fs-18" type="button">
          아이디 찾기
        </button>
        <div className="findid_ask notoMid fs-12 flex justify-center">
          이미 계정이 있으신가요?
          <div className="findid_ask_login">
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindId;
