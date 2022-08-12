import React, { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
import { v4 } from "uuid";
import TalkCard from "./TalkCard";
import { getTalk } from "../../apis/talk";
import "./TalkCard.scss";

function TalkList() {
  const [talkList, setTalkList] = useState([]);
  // const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [ref, inView] = useInView();
  useEffect(() => {
    async function setTalk() {
      const page = 1;
      const res = await getTalk(page);
      // console.log(res);
      setTalkList([...talkList, ...res]);
    }
    setTalk();
  }, []);
  // useEffect(() => {
  //   if (inView && !loading) {
  //     setLoading(true);
  //     setPage(page + 1);
  //   }
  // }, [inView, loading]);
  return (
    <div className="talkCardList flex">
      {talkList.length !== 0 &&
        talkList.map(
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

export default TalkList;