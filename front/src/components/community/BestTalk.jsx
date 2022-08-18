/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BestTalk.scss";

function BestTalk({
  blobFile,
  title,
  talkId,
}) {
  const navigate = useNavigate();
  const onClickThumbnail = () => {
    navigate(`/board/talk/detail/${talkId}`);
  };
  return (
    <div className="bestTalk">
      <button type="button" onClick={onClickThumbnail}>
        <div className="bestTalk_img">
          <img src={[blobFile]} alt="메인이미지" title="cardImg" />
        </div>
        <div className="bestTalk_title notoBold fs-18">{title}</div>
      </button>
    </div>
  );
}

export default BestTalk;
