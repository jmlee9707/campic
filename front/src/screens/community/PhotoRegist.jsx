/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import "./PhotoRegist.scss";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import PlzLogin from "@screens/PlzLogin" 
import { selectProfile } from "@store/user";
import { writePhoto } from "@apis/photo"; 

function PhotoRegist() {
  const profile = useSelector(selectProfile);
  const userId = useSelector(state => state.user.email);
  const navigate = useNavigate(); 
  const photoInput = useRef(); 
  const handleclick = () => {
    photoInput.current.click();
  };

  const [fileImage, setFileImage] = useState(""); 
  const saveFileImage = event => {

    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const textareaRef = useRef(); 
  const tagRef = useRef(); 

  const submit = async () => {
    // eslint-disable-next-line no-use-before-define
    actionImgCompress(photoInput.current.files[0]);
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
      window.alert("사진을 등록해주세요!")
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
    const file = new File([blob], "image.jpg");

    const formData = new FormData();

    formData.append("nickname", profile.nickname);
    formData.append("email", profile.userId);
    formData.append("content", textareaRef.current.value);
    formData.append("hashtag", tagRef.current.value);
    formData.append("fileName", "baek");
    formData.append("file", file);


    try {
      const res = await writePhoto(formData);
      if (res.message === "success") {
        navigate(`/board/photo/detail/${res.boardId}`);
      }
    } catch (error) {
      console.log("왜 에러날까?");
    }
  };

  useBeforeunload(event => event.preventDefault());

  return (
    <div className="container flex">
      {userId !== null && (
        <div className="photo_regist">
          <div className="photo_regist_title notoBold fs-32">사진 등록하기</div>
          <div className="photo_regist_content">
            <div
              className="photo_regist_content_img flex align-center justify-center"
              onClick={handleclick}
            >
              {!fileImage && <Camera className="camera" fill="#DBDBDB" />}
              {!fileImage && (
                <div className="photo_regist_content_img_sub fs-28 notoBold">
                  Upload
                </div>
              )}
              {fileImage && (
                <div className="photo_regist_content_img_priv">
                  <img alt="sample" src={fileImage} />
                </div>
              )}
              <input
                type="file"
                multiple="multiple"
                encType="multipart/form-data"
                accept="image/jpg, image.jpeg, image.png"
                ref={photoInput}
                style={{ display: "none" }}
                name="imgFile"
                id="imgFile"
                onChange={saveFileImage}
              />
            </div>
            <div className="photo_regist_content_text">
              <textarea
                type="textarea"
                placeholder="사진에 대해 설명해주세요."
                className="photo_regist_content_text_input_box notoMid fs-20"
                ref={textareaRef}
              />
              <input
                ref={tagRef}
                type="text"
                placeholder="#태그입력"
                className="photo_regist_content_text_tag flex notoMid fs-20"
              />
              <div className="photo_regist_content_text_box flex">
                <button
                  type="button"
                  className="photo_regist_content_text_btn notoBold fs-24"
                  onClick={submit}
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {userId === null && <PlzLogin/>}
    </div>
  );
}

export default PhotoRegist;
