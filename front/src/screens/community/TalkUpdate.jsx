/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useRef, useState, useEffect } from "react";
import "./TalkUpdate.scss";
// import imageCompression from "browser-image-compression";
import { useSelector } from "react-redux";
import { CKEditor } from "ckeditor4-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlzLogin from "@screens/PlzLogin" 
import { updateTalk, getTalkDetail } from "../../apis/talk";

function TalkUpdate() {
  const userId = useSelector(state => state.user.email);
  const { id } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef();
  const tagRef = useRef();
  const [talkContent, setTalkContent] = useState({
    contents: null
  });
  async function bringTalkInfo() {
    const res = await getTalkDetail(id);
    setTalkContent(res);
    // eslint-disable-next-line no-use-before-define
    setTitleLength(res.title.length);
  }
  useEffect(() => {
    bringTalkInfo();
  }, []);
  const [titleLength, setTitleLength] = useState(0);
  const getValue = e => {
    setTitleLength(e.target.value.length);
  };
  const modiTalk = async () => {
    if (
      titleRef.current.value === "" ||
      talkContent.contents === "" ||
      tagRef.current.value === ""
    ) {
      window.alert("내용을 채워주세요!");
    } else {
      const formData = new FormData();
      formData.append("talkId", id);
      formData.append("title", titleRef.current.value);
      formData.append("hashtag", tagRef.current.value);
      formData.append("fileName", "baek");
      formData.append("contents", talkContent.contents);
      // eslint-disable-next-line no-restricted-syntax
      try {
        const res = await updateTalk(formData);
        if (res === "success") {
          console.log("success");
        }
        navigate(`/board/talk/detail/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container flex">
      {userId !== null && <div className="modifyTalk">
        <div className="modifyTalk_title notoBold fs-32">글 수정하기</div>
        <div className="modifyTalk_content flex justify-center">
          {/* 사진 업로드 박스 */}
          {/* eslint-disable no-shadow */}
            <div className="modifyTalk_content_img_priv">
              <img alt="수정이미지" src={[talkContent.blobFile]} />
            </div>
        </div>
        <div className="modifyTalk_text flex align-center justify-center">
          <div className="modifyTalk_text_name flex align-center">
            <input
              ref={titleRef}
              type="text"
              className="modifyTalk_text_name_input notoMid fs-24"
              defaultValue={talkContent.title}
              name="title"
              maxLength={30}
              onChange={getValue}
            />
            <div
              className="modifyTalk_text_name_count roReg fs-24"
            >
              {titleLength}/30
            </div>
          </div>
          <div className="divide" />
          <div className="modifyTalk_text_content_box" id="editor">
            {talkContent.contents != null && (
              <CKEditor
                style={{ borderColor: "#467264" }}
                initData={talkContent.contents}
                onChange={e => {
                  const data = e.editor.getData();
                  setTalkContent({
                    ...talkContent,
                    contents: data
                  });
                }}
                config={{
                  readOnly: false,
                  uiColor: "#AADC6E",
                  height: 500,
                  fontSize_sizes: 100,
                  width: 900,
                  resize_enabled: false,
                  toolbar: [
                    ["Format", "Font", "FontSize"],
                    ["Bold", "Italic"],
                    ["Undo", "Redo"],
                    ["EasyImageUpload"]
                  ],
                  extraPlugins: "easyimage",
                  removePlugins: "image, elementspath",
                  cloudServices_uploadUrl:
                    "https://91303.cke-cs.com/easyimage/upload/",
                  cloudServices_tokenUrl:
                    "https://91303.cke-cs.com/token/dev/YKWXTv96VvydZrqmu2LT57Ln33mQdHh10Kfe?limit=10"
                }}
              />
            )}
          </div>
          <input
            ref={tagRef}
            type="text"
            defaultValue={talkContent.hashtag}
            className="modifyTalk_text_content_tag notoReg fs-16"
          />
          <div className="divide" />
        </div>
        <div className="modifyTalk_btn flex align-center justify-center">
          <Link
            to={`/board/talk/detail/${id}`}
            className="modifyTalk_btn_back notoBold fs-24"
          >
            뒤로가기
          </Link>
          <button
            type="button"
            className="modifyTalk_btn_ok notoBold fs-24"
            onClick={modiTalk}
          >
            수정하기
          </button>
        </div>
      </div>}
      {userId === null && <PlzLogin/>}
    </div>
  );
}

export default TalkUpdate;
