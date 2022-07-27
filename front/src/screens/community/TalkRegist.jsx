import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./TalkRegist.scss";
// import camera from "@images/logo/logo_photo_black.svg";
import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";

// import CommunityNavBar from "@components/community/CommunityNavBar";

function TalkRegist() {
  const [count, setCount] = useState(0)


  const increaseCount = () => {
    setCount(count+1)
  }

  // const decreaseCount = () => {
  //   setCount(count-1)
  // }
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



  return (
    <div className="container flex">
      {/* <CommunityNavBar /> */}
      <div className="regist">
        <div className="regist_title notoBold fs-32">글 등록하기</div>
        <div className="regist_img flex justify-center">
          {/* 사진 업로드 박스 */}
          <div className="regist_img_cover flex align-center justify-center">
            {/* <img src={camera} alt="camera" /> */}
            {/* 카메라 로고 컴포넌트화 */}
            {!fileImage &&<Camera className="camera" fill="#DBDBDB" onClick={handleclick} />}
            {!fileImage && <div className="regist_img_cover_sub fs-28 notoBold">커버 사진 업로드</div> }
            {fileImage && (<div className="regist_img_cover_priv"><img alt="sample" src={fileImage} /></div> )}
            <input
              type="file"
              accept="image/jpg, image.jpeg, image.png"
              ref={photoInput}
              style={{ display: "none" }}
              name="imgFile"
              id="imgFile"
              onChange={saveFileImage}
            />
            {/* <div className="regist_img_cover_sub fs-20 notoBold">
              커버 사진 업로드
            </div> */}
          </div>
          {/* 사진 업로드 박스 끝 */}
        </div>

        {/* 제목 입력 박스 */}
        <div className="regist_text flex align-center justify-center">
          <div className="regist_text_name flex align-center">
            <input
              type="text"
              className="regist_text_name_input notoMid fs-24"
              id="subarea"
              placeholder="제목을 입력해주세요."
              maxLength="46"
              onKeyUp={increaseCount}
            />
            <span id="count" className="regist_text_name_count roReg fs-24">
              ({count}/30)
            </span>
          </div>
        <div className="divide" />
          <textarea
            type="textarea"
            className="regist_text_content_input notoReg fs-20"
            placeholder="내용을 입력해 주세요."
          />
          <input
            type="text"
            placeholder="# 태그입력"
            className="regist_text_content_tag notoReg fs-16"
          />
        <div className="divide" />
        </div>
        <div className="regist_btn flex align-center justify-center">
          <Link to="/board/talk" className="regist_btn_back notoBold fs-24">
            뒤로가기
          </Link>
          <button type="button" className="regist_btn_ok notoBold fs-24">
            등록하기
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default TalkRegist;
