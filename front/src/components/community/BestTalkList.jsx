import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import BestTalk from "./BestTalk";
import "./BestTalk.scss";
import { getTalkBest } from "../../apis/talk";
// import { Link } from "react-router-dom";

function BestTalkList() {
  const [bestTalkList, setBestTalkList] = useState([]); // 불러온 데이터 저장
  // 베스트포토api 호출, 8개 담김
  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetBestTalk() {
      const res = await getTalkBest();
      console.log(res);
      setBestTalkList(res);
    }
    getAndSetBestTalk();
  }, []);
  // console.log(bestPhotoList)
  // const newBestPhotoList = BestPhotoList.slice(0[ 4]);

  return (
    <div className="bestTalkList flex">
      {bestTalkList.length !== 0 &&
        bestTalkList.map(
          ({ blobFile, talkId, nickname, content, title }) => (
            <BestTalk
              key={v4()}
              talkId={talkId}
              title={title}
              blobFile={blobFile}
              nickname={nickname}
              content={content}
            />
          )
        )}
    </div>
  );
}

export default BestTalkList;
