import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import BestTalk from "./BestTalk";
import "./BestTalk.scss";
import { getTalkBest } from "../../apis/talk";

function BestTalkList() {
  const [bestTalkList, setBestTalkList] = useState([]); 
  useEffect(() => {
    async function getAndSetBestTalk() {
      const res = await getTalkBest();
      setBestTalkList(res);
    }
    getAndSetBestTalk();
  }, []);

  return (
    <div className="bestTalkList flex">
      {bestTalkList.length !== 0 &&
        bestTalkList.map(({ blobFile, talkId, nickname, content, title }) => (
          <BestTalk
            key={v4()}
            talkId={talkId}
            title={title}
            blobFile={blobFile}
            nickname={nickname}
            content={content}
          />
        ))}
    </div>
  );
}

export default BestTalkList;
