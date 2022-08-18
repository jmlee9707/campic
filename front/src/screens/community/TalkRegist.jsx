/* eslint-disable no-shadow */
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import imageCompression from "browser-image-compression";
import "./TalkRegist.scss";
import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";
import { CKEditor } from "ckeditor4-react";
import PlzLogin from "@screens/PlzLogin" 
import { selectProfile } from "../../store/user";
import { writeTalk } from "../../apis/talk";


function TalkRegist() {
  const profile = useSelector(selectProfile);
  const talkEmail = useSelector(state => state.user.email);
  const navigate = useNavigate();
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };
  const [fileImage, setFileImage] = useState(""); 
  const saveFileImage = event => {
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const titleRef = useRef(); 
  const tagRef = useRef(); 
  const [talkContent, setTalkContent] = useState({
    content: ""
  });
  const [titleLength, setTitleLength] = useState(0);
  const getValue = e => {
    setTitleLength(e.target.value.length);
  };

  const submit = async () => {
    if (
      photoInput.current.files[0].name.slice(-3).toLowerCase() === "jpg" ||
      photoInput.current.files[0].name.slice(-3).toLowerCase() === "png" ||
      photoInput.current.files[0].name.slice(-4).toLowerCase() === "jpeg"
    ) {
      // eslint-disable-next-line no-use-before-define
      actionImgCompress(photoInput.current.files[0]);
    } else {
      window.alert("이미지 파일로 등록해주세요");
    }
  };
  const actionImgCompress = async fileImage => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 720,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(fileImage, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        // eslint-disable-next-line no-use-before-define
        handlingDataForm(base64data);
      };
    } catch (error) {
      window.alert("썸네일을 등록해주세요");
    }
  };
  const handlingDataForm = async dataURI => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg"
    });
    if (
      titleRef.current.value === "" ||
      talkContent.content === "" ||
      tagRef.current.value === ""
    ) {
      window.alert("내용을 채워주세요!");
    } else {
      const file = new File([blob], "image.jpg");
      const formData = new FormData();
      formData.append("nickname", profile.nickname);
      formData.append("title", titleRef.current.value);
      formData.append("hashtag", tagRef.current.value);
      formData.append("fileName", "baek");
      formData.append("file", file);
      formData.append("contents", talkContent.content);
      try {
        const res = await writeTalk(formData);
        if (res.message === "success") {
          navigate(`/board/talk/detail/${res.talkId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useBeforeunload(event => event.preventDefault());


  return (
    <div className="container flex">
      {talkEmail !== null && (
        <div className="regist">
          <div className="regist_title notoBold fs-32">글 등록하기</div>
          <div className="regist_img flex justify-center">
            <button
              className="regist_img_cover flex align-center justify-center"
              onClick={handleClick}
              type="button"
            >
              {!fileImage && <Camera className="camera" fill="#DBDBDB" />}
              {!fileImage && (
                <div className="regist_img_cover_sub fs-28 notoBold">
                  Upload
                </div>
              )}
              {fileImage && (
                <div className="regist_img_cover_priv">
                  <img alt="sample" src={fileImage} />
                </div>
              )}
              <input
                type="file"
                multiple="multiple"
                encType="multipart/form-data"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                ref={photoInput}
                style={{ display: "none" }}
                name="imgFile"
                id="imgFile"
                onChange={saveFileImage}
              />
            </button>
          </div>
          <div className="regist_text flex align-center justify-center">
            <div className="regist_text_name flex align-center">
              <input
                ref={titleRef}
                type="text"
                className="regist_text_name_input notoMid fs-24"
                placeholder="제목을 입력해주세요."
                name="title"
                maxLength={29}
                onChange={getValue}
              />
              <div
                className="regist_text_name_count roReg fs-24"
              >
                {titleLength}/30
              </div>
            </div>
            <div className="divide" />
            <div className="regist_text_content_box" id="editor">
              <CKEditor
                initData=""
                style={{ borderColor: "#467264" }}
                onChange={e => {
                  const data = e.editor.getData();
                  setTalkContent({
                    ...talkContent,
                    content: data
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
            </div>
            <input
              ref={tagRef}
              type="text"
              placeholder="# 태그입력"
              className="regist_text_content_tag notoReg fs-16"
            />
            <div className="divide" />
          </div>
          <div className="regist_btn flex align-center justify-center">
            <Link
              to="/board/talk/home"
              className="regist_btn_back notoBold fs-24"
            >
              뒤로가기
            </Link>
            <button
              type="button"
              className="regist_btn_ok notoBold fs-24"
              onClick={submit}
            >
              등록하기
            </button>
          </div>
        </div>
      )}
      {talkEmail === null && <PlzLogin/>}
    </div>
  );
}

export default TalkRegist;
