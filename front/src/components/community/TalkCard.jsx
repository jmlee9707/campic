import React from "react";
import "./TalkCard.scss";
import card from "@images/friend.jpeg";
import profile from "@images/cute.jpeg";

function TalkCard() {
  return (
    <div className="talkcard">
      <div className="talkcard_emg">
        <img src={card} alt="cardImg" title="cardImg" />
      </div>
      <div className="talkcard_subject notoBold fs-18">
        10년차 캠핑러가 말하는 감성 캠핑 즐기는 꿀팁 5
      </div>
      <div className="talkcard_infoma flex">
        <div className="talkcard_infoma_profile flex">
          <div className="talkcard_infoma_profile_img">
            <img src={profile} alt="profile" title="profile" />
          </div>
          <p className="talkcard_infoma_profile_name notoMid fs-13">빌헬름</p>
        </div>
        <div className="talkcard_infoma_txt flex align-center">
          <p className="talkcard_infoma_txt_look notoMid fs-13">조회수</p>
          <p className="talkcard_infoma_txt_look_cnt notoMid fs-13">7777</p>
          <p className="talkcard_infoma_txt_like notoMid fs-13">좋아요</p>
          <p className="talkcard_infoma_txt_like_cnt notoMid fs-13">7777</p>
        </div>
      </div>
    </div>
  );
}

export default TalkCard;
