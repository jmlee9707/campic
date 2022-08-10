import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import MyPhotoCard from "./MyPhotoCard";
import "./MyPhotoCard.scss";
// import { selectEmail } from "../../store/user";
import { getMyPhoto } from "../../apis/photo";

function PhotoCardList() {
  const email = useSelector(state => state.user.email);

  const [myPhotoList, setMyPhotoList] = useState([]);

  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetMyPhotoList() {
      const res = await getMyPhoto(email);
      // console.log(res);
      // console.log("11111");
      setMyPhotoList(res);
    }
    getAndSetMyPhotoList();
  }, []);
  console.log(myPhotoList);

  return (
    <div className="photoList flex">
      {myPhotoList.length !== 0 &&
        myPhotoList.map(({ blobFile, boardId }) => (
          <MyPhotoCard key={v4()} blobFile={blobFile} boardId={boardId} />
        ))}
      {myPhotoList.length === 0 && (
        <div>감성 넘치는 사진을 자랑 해 보세요!</div>
      )}
    </div>
  );
}

export default PhotoCardList;
