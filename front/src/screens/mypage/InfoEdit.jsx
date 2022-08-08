import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "@images/logo/logo_icon_green.svg";
import imageCompression from "browser-image-compression"
import "./InfoEdit.scss";
import { useSelector, useDispatch } from "react-redux";

import { modifyUserInfo, modifyUserProfileImg } from "@apis/user";
import { selectProfile, updateUserInfo, setProfileImg } from "@store/user";

function InfoEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickRef = useRef();
  const phoneRef = useRef();
  const birthRef = useRef();
  const inputRef = useRef();

  const Profile = useSelector(selectProfile);
  const [imgFile, setImgFile] = useState(null);
  const [imgBase64, setImgBase64] = useState("");
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
        tel: phoneRef.current.value
      };

      console.log(imgFile);
      const res = await modifyUserInfo(userInfo);

      // 이미지 저장 api 호출
      const formData = new FormData();
      const byteString = atob(imgBase64.split(",")[1]);
  
      // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: "image/jpeg"
      });
      const file = new File([blob], imgFile.name);
      formData.append("email", Profile.email);
      formData.append("file", file);
      console.log(file);
      const res1 = await modifyUserProfileImg(formData);

      if (res === "success" && res1 === "success") {
        dispatch(updateUserInfo(userInfo));
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
  // 이미지 받기
  const handleChangeFile = async (event) => {
    console.log("압축하기")
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
        dispatch(setProfileImg(base64.toString()));
      }
    }

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 720,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(event.target.files[0], options);

      
      await setImgFile(compressedFile);
    }
  };
  const cl = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  return (
    <div className="container flex justify-center">
      <div className="infoedit ">
        <div className="infoedit_top flex justify-center">
          <div className="infoedit_top_title notoBold fs-28">개인정보 수정</div>
            <div>
              { !imgBase64 && <img src={Profile.profileImg} alt="Profile_Image"/> }
              { imgBase64 && <img src={imgBase64} alt="" />}
            </div>
          <input type="file" className="imginput" name="imgFile" id="imgFile" ref={inputRef} onChange={handleChangeFile}/>
          <button className="infoedit_top_btn notoBold fs-15" type="button" onClick={cl} >
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
              value={Profile.email}
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
              placeholder={Profile.nickname}
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
              placeholder={Profile.tel}
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
              placeholder={Profile.birth}
            />
          </div>
          <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">
              회원 가입 날짜
            </div>
            <input
              type="text"
              className="infoedit_box_input notoMid fs-14"
              placeholder={Profile.joinDate}
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
              value={Profile.auth}
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
