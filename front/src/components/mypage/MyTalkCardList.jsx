import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import MyTalkCard from "./MyTalkCard";
import "./MyTalkCard.scss";
import { getMyTalk } from "../../apis/talk";

function MyTalkCardList() {
  const email = useSelector(state => state.user.email);
  const [myTalkList, setMyTalkList] = useState([]);
  useEffect(() => {
    async function getAndSetMyTalkList() {
      const res = await getMyTalk(email);
      setMyTalkList(res);
    }
    getAndSetMyTalkList();
  }, []);
  return (
    <div className="talkList flex">
      {myTalkList.length !== 0 &&
        myTalkList.map(({ blobFile, title, talkId }) => (
          <MyTalkCard key={v4()} blobFile={blobFile} title={title} talkId={talkId} />
        ))}
      {myTalkList.length === 0 && (
        <div className="talkList_nope notoMid fs-32">당신의 경험을 공유해 보세요!</div>
      )}
    </div>
  );
}

export default MyTalkCardList;
