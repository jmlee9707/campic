import React from "react";
import "./MyTalkCard.scss";
import card from "@images/friend.jpeg";

function MyTalkCard() {
  return (
    <div className="my_talkcard">
      <div className="my_talkcard_img">
        <img src={card} alt="cardImg" title="cardImg" />
      </div>
      <div className="my_talkcard_subject notoBold fs-18">
        10년차 캠핑러가 말하는 감성 캠핑 즐기는 꿀팁 5
      </div>
    </div>
  );
}

export default MyTalkCard;
