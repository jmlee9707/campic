import React from "react";
import TalkCard from "./TalkCard";
import "./TalkCard.scss";

function TalkList() {
  return (
    <div className="flex talkCardList">
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
      <TalkCard />
    </div>
  );
}

export default TalkList;
