import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyTalkCard.scss";

function MyTalkCard({blobFile, title, talkId}) { 
  const navigate = useNavigate();
  const onClickTalk = () => {
    navigate(`/board/talk/detail/${talkId}`)
  }
  return (
    <button type="button" onClick={onClickTalk}>
      <div className="talkCard">
        <div className="talkCard_img">
          <img src={[blobFile]} alt="썸네일" />
        </div>
        <div className="talkCard_title notoBold fs-18">
          { title }
        </div>
      </div>
    </button>
  );
}

export default MyTalkCard;
