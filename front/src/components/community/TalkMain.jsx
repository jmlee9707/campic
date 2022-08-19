import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import TalkCard from "./TalkCard";
import { getTalkBest } from "../../apis/talk";
import "./TalkCard.scss";

// eslint-disable-next-line react/prop-types
function TalkMain() {
  const [mainTalk, setMainTalk] = useState([]);
  useEffect(() => {
    async function getTalk() {
      const res = await getTalkBest();
      setMainTalk(res);
    }
    getTalk();
  }, []);
  return (
    <div className="talkCardList flex">
      {mainTalk.length !== 0 &&
        mainTalk.map(
          ({
            blobFile,
            profileImgPath,
            nickname,
            title,
            like,
            talkId,
            click
          }) => (
            <TalkCard
              key={v4()}
              talkId={talkId}
              blobFile={blobFile}
              nickname={nickname}
              title={title}
              profileImgPath={profileImgPath}
              like={like}
              click={click}
            />
          )
        )}
    </div>
  );
}

export default TalkMain;
