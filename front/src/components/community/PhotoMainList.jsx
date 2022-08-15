// 커뮤니티메인 베스트포토
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import BestPhoto from "./BestPhoto";
import { getBestPhoto } from "../../apis/photo";

function MainPhotoList() {
  const [bestPhotoList, setBestPhotoList] = useState([]); // 불러온 데이터 저장
  // 베스트포토api 호출, 8개 담김
  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetBestPhoto() {
      const res = await getBestPhoto();
      setBestPhotoList(res);
    }
    getAndSetBestPhoto();
  }, []);

  return (
    <div className="best_photo_list flex">
      {bestPhotoList.length !== 0 &&
        bestPhotoList.map(
          ({ blobFile, profileImgPath, boardId, nickname, content }) => (
            <BestPhoto
              key={v4()}
              boardId={boardId}
              blobFile={blobFile}
              nickname={nickname}
              content={content}
              profileImgPath={profileImgPath}
            />
          )
        )}
    </div>
  );
}

export default MainPhotoList;
