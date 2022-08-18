import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import imageCompression from "browser-image-compression"
import "./InfoEdit.scss";
import { useSelector, useDispatch } from "react-redux";

import { modifyUserInfo, modifyUserProfileImg } from "@apis/user";
import { selectProfile, updateUserInfo, setProfileImg, setNickname, setTel } from "@store/user";
import PlzLogin from "@screens/PlzLogin" 

function InfoEdit() {
  const userId = useSelector(state => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickRef = useRef();
  const phoneRef = useRef();
  const inputRef = useRef();

  const Profile = useSelector(selectProfile);
  const [imgFile, setImgFile] = useState(null);
  const [imgBase64, setImgBase64] = useState("");
  const [nickError, setNickError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nickMess, setNickMess] = useState("");
  const [phoneMess, setPhoneMess] = useState("");


  const [startDate, setStartDate] = useState( Profile.birth ? new Date(Profile.birth) : new Date());
  const canEdit = async () => {
    if (!nickError && !phoneError) {
      const userInfo = {
        birth: `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`,
        email: Profile.email,
        nickname: Profile.nickname,
        tel: Profile.tel
      };

      const res = await modifyUserInfo(userInfo);
      if (imgBase64) {
        const formData = new FormData();
        const byteString = atob(imgBase64.split(",")[1]);
    
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
  
        await modifyUserProfileImg(formData);
      }

      if (res === "success") {
        dispatch(updateUserInfo(userInfo));
        navigate("/mypage/myfeed"); 
      }
    } else {
      alert("입력된 값을 다시 한번 확인해주세요");
    }
  };


  const checkNick = e => {
    const regNick = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,8}$/;
    if (regNick.test(e.target.value) === false) {
      setNickMess("2~8자리의 문자로 입력해주세요");
      setNickError(true); 
    } else {
      dispatch(setNickname({nickname: nickRef.current.value}));
      setNickMess(" ");
      setNickError(false);
    }
  };


  const checkPhone = e => {
    const regPhone = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (regPhone.test(e.target.value) === false) {
      setPhoneMess("10~11자리 숫자만 입력해주세요");
      setPhoneError(true); // 에러발생
    } else {
      dispatch(setTel({tel : phoneRef.current.value}));
      setPhoneMess(" ");
      setPhoneError(false);
    }
  };

  const handleChangeFile = async (event) => {
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

  const editImg = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <div className="container flex justify-center">
      {userId !== null && <div className="infoedit ">
        <div className="infoedit_top flex justify-center">
          <div className="infoedit_top_title notoBold fs-28">개인정보 수정</div>
            <div>
              { !imgBase64 && <img src={Profile.profileImg} alt="Profile_Image"/> }
              { imgBase64 && <img src={imgBase64} alt="" />}
            </div>
          <input type="file" className="imginput" name="imgFile" id="imgFile" ref={inputRef} onChange={handleChangeFile}/>
          <button className="infoedit_top_btn notoBold fs-15" type="button" onClick={editImg} >
            프로필 사진 변경
          </button>
          <div className="divide" />
        </div>
        <div className="flex justify-center align-center column">
          {Profile.isSocial === "default" && <div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">이메일</div>
            <input
              type="email"
              className="infoedit_box_input  notoMid fs-14"
              value={Profile.email}
              readOnly
            />
          </div>}
          {Profile.isSocial !== "default" &&<div className="infoedit_box">
            <div className="infoedit_box_title notoBold fs-15">
              소셜 로그인 여부
            </div>
            <input
              type="text"
              className="infoedit_box_input notoMid fs-14"
              value={Profile.isSocial}
              readOnly
            />
          </div>}
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
            <div className="infoedit_box_title notoMid fs-15">생일</div>
            <DatePicker
              className="infoedit_box_input notoMid fs-14"
              selected={startDate}
              dateFormat="yyyy/MM/dd"
              onChange={date => {
                setStartDate(date);
            }}
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
      </div>}
      {userId === null && <PlzLogin/>}
    </div>
  );
}
export default InfoEdit;
