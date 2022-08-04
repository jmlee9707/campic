import React from "react";
import "./CampingDetail.scss";
import temp from "@images/temp_1.jpeg";
import map from "@images/map_temp.jpg";

function CampingDetail() {
  //   const [campingName, setCampingName] = useState("수완동 캠핑장");
  const campingName = "수완동 캠핑장";
  const campingIntro = "한줄 소개소개소개";
  const address = "광주광역시 광산구 수완동 1111-1111 ";
  const phone = "010-0000-0000";
  const distance = "77";
  const url = "https://naver.com";

  // 사이츠 이동
  const moveSite = () => {
    window.open(`${url}`);
  };
  return (
    <div className="container flex justify-center">
      <div className="detail">
        <div className="detail_title notoBold fs-52">{campingName}</div>
        <div className="detail_camp">
          <div className="detail_camp_img_box">
            <img src={temp} alt="campingImage" title="test" />
          </div>
          <div className="detail_camp_intro notoBold fs-30">{campingIntro}</div>
          <div className="detail_camp_sub notoMid fs-20 flex">
            <div className="detail_camp_sub_add">{address}</div>
            <div className="detail_camp_sub_distance">~{distance}km</div>
          </div>
          <div className="detail_camp_sub notoMid fs-20">{phone}</div>
          <div className="detail_camp_btn flex justify-center">
            <button
              type="button"
              className="detail_camp_btn_plan notoBold fs-20"
            >
              일정에 추가하기
            </button>
            <button
              type="button"
              className="detail_camp_btn_site notoBold fs-20"
              onClick={moveSite}
            >
              사이트 바로가기
            </button>
          </div>
          <div className="detail_camp_text">
            <div className="divide" />
            <div className="detail_camp_text_info">
              <div className="detail_camp_text_info_title notoBold fs-30">
                기본 정보
              </div>
              <div className="detail_camp_text_info_sub notoMid fs-20">
                <div className="detail_camp_text_info_sub_basic">기본 시설</div>
                <div className="detail_camp_text_info_sub_basic">부대 시설</div>
              </div>
            </div>
            <div className="divide" />
            <div className="detail_camp_text_map">
              <div className="detail_camp_text_map_title notoBold fs-30">
                약도
              </div>
              <div className="detail_camp_img_box notoMid fs-20">
                <img src={map} alt="map" className="deta" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampingDetail;
