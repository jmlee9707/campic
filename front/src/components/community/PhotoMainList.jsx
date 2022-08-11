// 커뮤니티메인 베스트포토
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import PhotoMain from "./PhotoMain";
import "./BestPhoto.scss";
import { getBestPhoto } from "../../apis/photo";
// import { Link } from "react-router-dom";

function MainPhotoList() {
  const [bestPhotoList, setBestPhotoList] = useState([]); // 불러온 데이터 저장
  // 베스트포토api 호출, 8개 담김
  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetBestPhoto() {
      const res = await getBestPhoto();
      // console.log(res);
      console.log("11111");
      setBestPhotoList(res);
    }
    getAndSetBestPhoto();
  }, []);
  console.log(bestPhotoList)

  return (
    <div className="maincomupiclist flex">
      {bestPhotoList.length !==0 &&
        bestPhotoList.map(({ blobFile, profileImgPath, boardId, nickname, content }) => (
          <button type="button">
            <PhotoMain 
              key={v4()}
              boardId={boardId}
              blobFile={blobFile}
              nickname={nickname}
              content={content}
              profileImgPath={profileImgPath}
            />
          </button>

        ))
      }
    </div>
  );
}

export default MainPhotoList;