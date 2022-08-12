/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityPhotoCard.scss";

import dummyLogo from "@images/person.png";
// import friend from "@images/friend.jpeg";

function CommunityPhotoCard({
  blobFile,
  profileImgPath,
  nickname,
  content,
  like,
  boardId,
  click
}) {
  const navigate = useNavigate();

  const onClickImg = () => {
    // eslint-disable-next-line no-undef
    navigate(`/board/photo/detail/${boardId}`);
  };

  return (
    <div className="image">
      <button type="button" onClick={onClickImg}>
        {/* 프로필 */}
        <div className="image_header flex align-center">
          {/* 프로필 이미지 */}
          <div className="image_header_profile flex">
            <div className="image_header_profile_pic">
              {profileImgPath !== null && <img src={[profileImgPath]} alt="프로필이미지" />}
              {profileImgPath === null && <img src={dummyLogo} alt="프로필이미지" />}
            </div>
            <div className="image_header_profile_name notoMid fs-20">{nickname}</div>
          </div>
          {/* 프로필 나머지 */}
          <div className="image_header_extra flex fs-13 justify-center align-center">
            <p className="image_header_extra_good notoMid">좋아요</p>
            <p className="image_header_extra_good_cnt roMid">{like}</p>
            <p className="image_header_extra_look notoMid">조회수</p>
            <p className="image_header_extra_look_cnt roMid">{click}</p>
          </div>
        </div>
        {/* 메인이미지 */}
        <div className="image_pic">
          <img src={[blobFile]} alt="메인이미지" />
        </div>
        {/* 본문 */}
        <div className="image_text flex notoMid fs-16">
          {content}
        </div>
      </button>
    </div>
  );
}

export default CommunityPhotoCard;
