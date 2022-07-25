import React from "react";
import MyTalkCard from "./MyTalkCard";
import "./MyTalkCard.scss";

function MyTalkCardList() {
  return (
    <div className="flex my_talklist">
      <MyTalkCard />
      <MyTalkCard />
      <MyTalkCard />
      <MyTalkCard />
      <MyTalkCard />
      <MyTalkCard />
    </div>
  );
}

export default MyTalkCardList;
