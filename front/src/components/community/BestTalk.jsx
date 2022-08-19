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
    <button type="button" onClick={onClickThumbnail}>
      <div className="best_talk">
        <div className="best_talk_img">
          <img src={[blobFile]} alt="메인이미지" />
        </div>
        <div className="best_talk_title flex notoBold fs-18">{title}</div>
      </div>
    </button>
  );
}

export default BestTalk;
