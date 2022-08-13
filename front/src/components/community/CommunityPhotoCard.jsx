import React from "react";
import "./CommunityPhotoCard.scss";

import navLogo from "@images/logo/logo_icon_green.svg";
import friend from "@images/friend.jpeg";

function CommunityPhotoCard() {
  return (
    <div className="image">
      {/* 프로필 */}
      <div className="image_header flex align-center">
        {/* 프로필 이미지 */}
        <div className="image_header_profile flex">
          <div className="image_header_profile_pic">
            <img src={navLogo} alt="프로필이미지" />
          </div>
          <div className="image_header_profile_name notoMid fs-20">클로이</div>
        </div>
        {/* 프로필 나머지 */}
        <div className="image_header_extra flex fs-13 justify-center align-center">
          <p className="image_header_extra_good notoMid">좋아요</p>
          <p className="image_header_extra_good_cnt roMid">7777</p>
          <p className="image_header_extra_look notoMid">조회수</p>
          <p className="image_header_extra_look_cnt roMid">7777</p>
        </div>
      </div>
      {/* 메인이미지 */}
      <div className="image_pic">
        <img src={friend} alt="메인이미지" />
      </div>
      {/* 본문 */}
      <div className="image_text notoMid fs-16">
        여름이니까 아이스 커피 왜 안되냐 이거만 만들면 앞으로 쭉쭉인데 ㅠㅠ
      </div>
    </div>
  );
}

export default CommunityPhotoCard;
