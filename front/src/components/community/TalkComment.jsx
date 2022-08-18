/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";
import "./TalkComment.scss";
import dummyProfile from "@images/person.png";
import { updateComment, deleteComment } from "../../apis/talk";

function TalkComment({
  commentId,
  nickname,
  depth,
  bundle,
  content,
  uploadDate,
  profileImg,
  commentEmail,
  toComment
}) {
  const uploadTime = moment(uploadDate).add(9, "h").fromNow();
  const modiRef = useRef();
  const userEmail = useSelector(state => state.user.email);
  const nowdepth = depth;
  const nowbundle = bundle;
  const [ifClick, setIfClick] = useState(false);
  const onClickModi = () => {
    setIfClick(click => !click);
  };
  const modiComment = async () => {
    const data = {
      email: userEmail,
      depth: nowdepth,
      bundle: nowbundle,
      content: modiRef.current.value
    };
    try {
      const res = await updateComment(commentId, data);
      if (res === commentId) {
        toComment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delComment = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const data = {
        content: ""
      };
      try {
        const res = await deleteComment(commentId, data);
        if (res === commentId) {
          toComment();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="comment flex">
      <div className="comment_img">
        {profileImg !== null && (
          <img src={`data:image/png;base64,${profileImg}`} alt="프로필이미지" />
        )}
        {profileImg === null && <img src={dummyProfile} alt="프로필이미지" />}
      </div>
      <div className="comment_extra flex ">
        <div className="comment_extra_name notoMid fs-20">{nickname}</div>
        {content !== "" && (
          <div className="comment_extra_text notoReg fs-18">{content}</div>
        )}
        {content === "" && (
          <div className="comment_extra_text notoReg fs-18">
            - 삭제된 댓글입니다 -
          </div>
        )}
        <div className="comment_extra_true flex">
          {content !== "" && (
            <div className="comment_extra_true_time notoReg fs-14">
              {uploadTime}
            </div>
          )}
          {content !== "" && commentEmail === userEmail && (
            <button
              type="button"
              className="comment_extra_true_update notoReg fs-14"
              onClick={onClickModi}
            >
              수정하기
            </button>
          )}
          {content !== "" && commentEmail === userEmail && (
            <button
              type="button"
              className="comment_extra_true_del notoReg fs-14"
              onClick={delComment}
            >
              삭제하기
            </button>
          )}
        </div>
        <div className="comment_extra_update notoReg fs-14">
          {content !== "" && ifClick === true && (
            <textarea
              type="textarea"
              className="comment_extra_update_text"
              ref={modiRef}
              placeholder={content}
            />
          )}
          {content !== "" && ifClick === true && (
            <button
              type="button"
              className="comment_extra_update_btn"
              onClick={modiComment}
            >
              입력
            </button>
          )}
          {content !== "" && ifClick === true && (
            <button
              type="button"
              className="comment_extra_update_can"
              onClick={onClickModi}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default TalkComment;
