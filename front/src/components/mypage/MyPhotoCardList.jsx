import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import MyPhotoCard from "./MyPhotoCard";
import "./MyPhotoCard.scss";
import { getMyPhoto } from "../../apis/photo";

function PhotoCardList() {
  const email = useSelector(state => state.user.email);

  const [myPhotoList, setMyPhotoList] = useState([]);

  useEffect(() => {
    async function getAndSetMyPhotoList() {
      const res = await getMyPhoto(email);
      setMyPhotoList(res);
    }
    getAndSetMyPhotoList();
  }, []);

  return (
    <div className="photoList flex">
      {myPhotoList.length !== 0 &&
        myPhotoList.map(({ blobFile, boardId }) => (
          <MyPhotoCard key={v4()} blobFile={blobFile} boardId={boardId} />
        ))}
      {myPhotoList.length === 0 && (
        <div className="photoList_nope notoMid fs-32">감성 넘치는 사진을 자랑 해 보세요!</div>
      )}
    </div>
  );
}

export default PhotoCardList;
