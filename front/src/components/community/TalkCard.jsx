/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TalkCard.scss";
import dummyProfile from "@images/person.png";

function TalkCard({
  blobFile,
  profileImgPath,
  nickname,
  title,
  like,
  talkId,
  click
}) {
  const navigate = useNavigate();
  const onClickThumbnail = () => {
    navigate(`/board/talk/detail/${talkId}`);
  };
  return (
    <div className="talkcard">
      <button type="button" onClick={onClickThumbnail}>
        <div className="talkcard_img">
          <img src={[blobFile]} alt="메인이미지" title="cardImg" />
        </div>
        <div className="talkcard_subject flex notoBold fs-18">{title}</div>
        <div className="talkcard_infoma flex align-center">
          <div className="talkcard_infoma_profile flex">
            <div className="talkcard_infoma_profile_img">
              {profileImgPath !== null && <img src={profileImgPath} alt="프로필이미지" title="profile" />}
              {profileImgPath === null && <img src={dummyProfile} alt="프로필이미지" title="profile" />}
            </div>
            <div className="talkcard_infoma_profile_name notoMid fs-16">
              {nickname}
            </div>
          </div>
          <div className="talkcard_infoma_txt flex justify-center align-center">
            <p className="talkcard_infoma_txt_look notoMid fs-13">조회수</p>
            <p className="talkcard_infoma_txt_look_cnt notoMid fs-13">
              {click}
            </p>
            <p className="talkcard_infoma_txt_like notoMid fs-13">좋아요</p>
            <p className="talkcard_infoma_txt_like_cnt notoMid fs-13">{like}</p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default TalkCard;
