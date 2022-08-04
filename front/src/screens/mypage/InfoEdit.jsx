import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "@images/logo/logo_icon_green.svg";
import "./InfoEdit.scss";
import { useSelector, useDispatch } from "react-redux";

import { modifyUserInfo } from "../../apis/user";
import { selectProfile, updateUserInfo } from '../../store/user';


function InfoEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickRef = useRef();
  const phoneRef = useRef();
  const birthRef = useRef();

  const Profile = useSelector(selectProfile);

  const [nickError, setNickError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nickMess, setNickMess] = useState("");
  const [phoneMess, setPhoneMess] = useState("");


  const canEdit = async () => {
    if (!nickError && !phoneError) {
      const userInfo = {
        birth: birthRef.current.value,
        email: Profile.email,
        nickname: nickRef.current.value,
        // profileImg: 
        tel: phoneRef.current.value,
      }
      const res = await modifyUserInfo(userInfo);
      
      if (res === "success") {
        dispatch(updateUserInfo(userInfo))
        navigate("/mypage/myfeed"); // 다음페이지로 이동xw
      }
    } else {
      alert("입력된 값을 다시 한번 확인해주세요");
    }
  };
  // 비밀번호 변경 페이지로 이동

  // 닉네임 유효성 확인
  const checkNick = e => {
    const regNick = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,8}$/;
    if (regNick.test(e.target.value) === false) {
      setNickMess("2~8자리의 문자로 입력해주세요");
      setNickError(true); // 에러발생
    } else {
      setNickMess(" ");
      setNickError(false);
    }
  };

  // 전화번호 유효성 확인
  const checkPhone = e => {
    const regPhone = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (regPhone.test(e.target.value) === false) {
      setPhoneMess("10~11자리 숫자만 입력해주세요");
      setPhoneError(true); // 에러발생
    } else {
      setPhoneMess(" ");
      setPhoneError(false);
    }
  };

  return (
    <div className="container flex justify-center">
      <div className="infoedit ">
        <div className="infoedit_top flex justify-center">
          <div className="infoedit_top_title notoBold fs-28">개인정보 수정</div>
          <img src={ Profile.profileImg } alt="Profile_Image" />
          <button className="infoedit_top_btn notoBold fs-15" type="button">
            프로필 사진 변경
          </button>
          <div className="divide" />
        </div>
        <div className="flex justify-center align-center column">
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">이메일</div>
            <input
              type="email"
              className="infoedit_box_input  notoMid fs-14"
              value={ Profile.email }
              readOnly
            />
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">닉네임</div>
            <input
              ref={nickRef}
              onChange={checkNick}
              type="text"
              className="infoedit_box_input notoMid fs-14"
              placeholder={ Profile.nickname }
            />
            <div
              className={
                nickError
                  ? "infoedit_box_input_check red notoMid fs-12"
                  : "infoedit_box_input_check notoMid fs-12"
              }
            >
              {nickMess}
            </div>
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">전화번호</div>
            <input
              ref={phoneRef}
              onChange={checkPhone}
              type="text"
              className="infoedit_box_input notoMid fs-14"
              placeholder={ Profile.tel }
            />
            <div
              className={
                phoneError
                  ? "infoedit_box_input_check red notoMid fs-12"
                  : "infoedit_box_input_check notoMid fs-12"
              }
            >
              {phoneMess}
            </div>
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">생일</div>
            <input
              ref={birthRef}
              type="text"
              className="infoedit_box_input notoMid fs-14"
              placeholder={ Profile.birth }
            />
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">
              회원 가입 날짜
            </div>
            <input
              type="text"
              className="infoedit_box_input notoMid fs-14"
              placeholder={ Profile.joinDate }
              readOnly
            />
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">
              소셜 로그인 여부
            </div>
            <input
              type="text"
              className="infoedit_box_input notoMid fs-14"
              value={ Profile.auth }
              readOnly
            />
          </div>
        </div>
        <div className="infoedit_btn flex justify-center align-center">
          <button
            className="notoBold fs-18 infoedit_btn_fini"
            type="button"
            onClick={canEdit}
          >
            수정 완료
          </button>
          <Link
            className="notoBold fs-18 infoedit_btn_chpw flex align-center justify-center"
            to="/infoedit/pwch"
          >
            비밀번호 수정
          </Link>
          <div className="infoedit_btn_drop notnoMid fs-12">
            <Link to="/mypage/drop">탈퇴하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoEdit;
