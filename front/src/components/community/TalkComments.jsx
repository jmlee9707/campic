import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
// import moment from "moment";
// import "moment/locale/ko";
// import "./TalkComments.scss";
// import navLogo from "@images/logo/logo_icon_green.svg";
import TalkComment from "./TalkComment";
import { getComment } from "../../apis/talk";

function TalkComments() {
  const { id } = useParams();
  const [talkComments, setTalkComments] = useState([]);
  useEffect(() => {
    async function getTalkComments() {
      const res = await getComment(id);
      setTalkComments(res);
      console.log(res);
    }
    getTalkComments();
  }, []);
  useEffect(()=> {
    getComment(id);
  }, [talkComments]);
  // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < talkComments.length; i++) {
  //   talkComments[i]
  // }
  // const uploadTime = moment(talkComments.uploadDate).fromNow();
  return (
    <div className="comment">
      {talkComments.length !== 0 &&
        talkComments.map(
          ({
            nickname,
            depth,
            bundle,
            content,
            uploadDate,
            profileImg,
            commentId
          }) => (
            <TalkComment
              key={v4()}
              talkId={id}
              commentId={commentId}
              nickname={nickname}
              depth={depth}
              bundle={bundle}
              content={content}
              uploadDate={uploadDate}
              profileImg={profileImg}
            />
          )
        )}
    </div>
  );
}
export default TalkComments;
