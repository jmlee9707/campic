import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { v4 } from "uuid";
import Loading from "@components/common/Loading";
import LastList from "@components/common/LastList";
import TalkCard from "./TalkCard";
import { getTalk } from "../../apis/talk";
import "./TalkCard.scss";

function TalkList() {
  const [talkList, setTalkList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [last, setLast] = useState(false);
  async function getTalkList() {
    const res = await getTalk(page);
    setTalkList([...talkList, ...res]);
    setLoading(false);
    if (res.length >= 0 && res.length < 15) {
      setLast(true);
    }
  }
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
      getTalkList();
    }
  }, [inView, loading]);
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
      {!last && loading ? <Loading /> : <div ref={ref} className="observer" />}
      {last && <LastList />}
    </div>
  );
}

export default TalkList;
