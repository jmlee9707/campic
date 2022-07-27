import React, { useRef, useState } from "react";
import "./PhotoRegist.scss";


import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";
// import { useEffect } from "react";

function PhotoRegist() {
  // 카메라 이미지에 파일 인풋 달기
  const photoInput = useRef();
  const handleclick = () => {
    photoInput.current.click();
  };
  // 사진 미리보기

  const [fileImage, setFileImage] = useState("");
  const saveFileImage = (event) =>{
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  // 이미지 리사이징


  return (
    <div className="container flex">
      {/* 커뮤니티 네브바 들어가야 함 */}
      <div className="regist">
        <div className="regist_title notoBold fs-32">사진 등록하기</div>
        <div className="regist_content flex">
          {/* 사진 업로드 박스 */}
          <div className="regist_content_img flex align-center justify-center">
            {!fileImage &&<Camera className="camera" fill="#DBDBDB" onClick={handleclick} />}
            {!fileImage && <div className="regist_content_img_sub fs-28 notoBold">Upload</div> }
            {fileImage && (<div className="regist_content_img_priv">
              <img alt="sample" src={fileImage}/>
            </div> )}
            <input
              type="file"
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
            />

            {/* 태그 입력 박스 */}

            <input
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
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoRegist;
