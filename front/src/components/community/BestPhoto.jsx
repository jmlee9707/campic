import React from "react";
import "./BestPhoto.scss";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function BestPhoto({ blobFile, boardId }) {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(`/board/photo/detail/${boardId}`);
  };

  return (
    <button type="button" onClick={onClickImg}>
      <div className="best_photo">
        <img src={[blobFile]} alt="베스트이미지" />
      </div>
    </button>
  );
}

export default BestPhoto;
