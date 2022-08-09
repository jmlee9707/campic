/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import "./PhotoRegist.scss";
import imageCompression from "browser-image-compression"
import { useNavigate } from "react-router-dom";
import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";
import { useSelector } from 'react-redux';
import { useBeforeunload } from "react-beforeunload";
import { writePhoto } from "../../apis/photo"; // 포토등록 api

function PhotoRegist() {
  // 유저정보 파악  
  const userId = useSelector(state => state.user.email);
  const nickname = useSelector(state => state.user.nickname);
  const navigate = useNavigate(); // 네비게이트, 작성 시 포토 상세페이지로 이동
  // 카메라 이미지에 파일 인풋 달기
  const photoInput = useRef(); // 포토ref
  const handleclick = () => {
    photoInput.current.click();
  };

  // 사진 미리보기

  const [fileImage, setFileImage] = useState(""); // 파일이미지
  const saveFileImage = event => {
    // @ts-ignore
    // setFileImage(URL.createObjectURL(event.target.files[0]));
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const textareaRef = useRef(); // 본문 ref
  const tagRef = useRef(); // 태그 ref

  const submit = async () => {
    // eslint-disable-next-line no-use-before-define
    actionImgCompress(photoInput.current.files[0]);
  };

  const actionImgCompress = async (fileImage) => {
    console.log("압축할게")

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 720,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileImage, options);
      // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
      // 변환 완료!
        const base64data = reader.result;
        console.log("변경끝")
        console.log(base64data)

      // formData 만드는 함수
        // eslint-disable-next-line no-use-before-define
        handlingDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useBeforeunload((event) => event.preventDefault());


  const handlingDataForm = async dataURI => {
    // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
    const byteString = atob(dataURI.split(",")[1]);
  
    // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
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
  
    // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
    // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
    const formData = new FormData();
    
    // 필요시 더 추가합니다.
    formData.append("nickname", nickname);
    formData.append("email", userId);
    formData.append("content", textareaRef.current.value);
    formData.append("hashtag", tagRef.current.value);
    formData.append("fileName", "baek");
    formData.append("file", file);

    // eslint-disable-next-line no-restricted-syntax
    for (const value of formData.values()) {
      console.log(value);
    }
    
  
    try {
      const res = await writePhoto(formData);
      if (res.message === "success") {
        navigate(`/board/photo/detail/${res.boardId}`);
      }
    } catch (error) {
      console.log("왜 에러남");
    }
  };


  
  return (
    <div className="container flex">
      {userId !== null && (
        <div className="regist">
        <div className="regist_title notoBold fs-32">사진 등록하기</div>
        <div className="regist_content flex">
          {/* 사진 업로드 박스 */}
          <div
            className="regist_content_img flex align-center justify-center"
            onClick={handleclick}
          >
            {!fileImage && <Camera className="camera" fill="#DBDBDB" />}
            {!fileImage && (
              <div className="regist_content_img_sub fs-28 notoBold">
                Upload
              </div>
            )}
            {fileImage && (
              <div className="regist_content_img_priv">
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

          <div className="regist_content_text">
            {/* 사진 설명 박스 */}

            <textarea
              type="textarea"
              placeholder="사진에 대해 설명해주세요."
              className="regist_content_text_input_box notoMid fs-20"
              ref={textareaRef}
            />

            {/* 태그 입력 박스 */}

            <input
              ref={tagRef}
              type="text"
              placeholder="#태그입력"
              className="regist_content_text_tag flex notoMid fs-20"
              // maxLength={30} // 일단 maxlength지정 해둠
            />

            {/* 등록하기 버튼 */}
            <div className="regist_content_text_box flex">
              <button
                type="button"
                className="regist_content_text_btn notoBold fs-24"
                onClick={submit}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      {userId === null && (
        window.alert("로그인 후 이용해주세요!!")
        
        )}
    </div>
  );
}

export default PhotoRegist;
