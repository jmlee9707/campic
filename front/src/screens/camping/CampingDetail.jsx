import React, { useEffect, useState } from "react";
import "./CampingDetail.scss";
import Location from "@components/common/Location";
import AddPlanModal from "@components/camping/AddPlanModal";
import temp from "@images/temp_1.jpeg";
import { useParams } from "react-router-dom";
import { campDetailInfo } from "../../apis/camp";

function CampingDetail() {
  const distance = "77";

  const [campInfo, setCampInfo] = useState(); // 캠핑장 정보
  const { id: campId } = useParams(); // 파라미터 정보 가져오기

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  // 사이트로 이동
  const moveSite = () => {
    // window.open(`${campInfo.homepage}`);
  };
  // 예약 사이트로 이동
  const moveReserve = () => {
    window.open(`${campInfo.resveUrl}`);
  };
  // 캠핑장 정보 가져오기
  const getCampDetailInfo = async () => {
    const res = await campDetailInfo(campId);
    setCampInfo(res);
  };

  useEffect(() => {
    // console.log(campId);
    getCampDetailInfo(); // 초기에 정보 받아오기
  }, [campId]);

  return (
    <div className="container flex justify-center">
      {campInfo && (
        <div className="detail">
          <div className="detail_title notoBold fs-52">{campInfo.facltNm}</div>
          <div className="detail_camp">
            <div className="detail_camp_img_box">
              {(!campInfo.firstImageUrl ||
                campInfo.firstImageUrl === "\\N") && (
                <img src={temp} alt="campingImage" title="test" />
              )}
              {campInfo.firstImageUrl !== "\\N" && (
                <img
                  src={campInfo.firstImageUrl}
                  alt="campingImage"
                  title="test"
                />
              )}
            </div>
            <div className="detail_camp_intro notoBold fs-30">
              {campInfo.lineIntro !== "\\N" && campInfo.lineIntro}
              {campInfo.lineIntro === "\\N" && (
                <>입력된 한줄 소개가 없습니다.</>
              )}
            </div>
            <div className="detail_camp_sub notoMid fs-20 flex">
              <div className="detail_camp_sub_add">{campInfo.addr1}</div>
              <div className="detail_camp_sub_distance">~{distance}km</div>
            </div>
            <div className="detail_camp_sub notoMid fs-20">
              {campInfo.tel !== "\\N" && campInfo.tel}
              {campInfo.tel === "\\N" && <>입력된 전화번호가 없습니다.</>}
            </div>
            <div className="detail_camp_btn flex justify-center">
              <button
                type="button"
                className="detail_camp_btn_plan notoBold fs-20"
                onClick={openModal}
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
              {campInfo.resveUrl !== "\\N" && (
                <button
                  type="button"
                  className="detail_camp_btn_plan notoBold fs-20"
                  onClick={moveReserve}
                >
                  예약 사이트로
                </button>
              )}
            </div>
            {/* 모달창 띄우기 */}
            {modalVisible && (
              <AddPlanModal
                visible={modalVisible}
                onClose={() => {
                  setModalVisible(false);
                }}
                campId={campId}
                facltNm={campInfo.facltNm}
              />
            )}
            <div className="detail_camp_text">
              <div className="divide" />
              <div className="detail_camp_text_info">
                <div className="detail_camp_text_info_title notoBold fs-30">
                  기본 정보
                </div>
                <div className="detail_camp_text_info_sub notoMid fs-20">
                  <div className="detail_camp_text_info_sub_basic">
                    {campInfo.sbrsCl === "\\N" && (
                      <>기본 시설 : 입력된 기본 시설이 없습니다.</>
                    )}
                    {campInfo.sbrsCl !== "\\N" && (
                      <>기본 시설 : {campInfo.sbrsCl}</>
                    )}
                  </div>
                  <div className="detail_camp_text_info_sub_basic">
                    {campInfo.posblFcltyCl === "\\N" && (
                      <>부대 시설 : 입력된 부대 시설이 없습니다.</>
                    )}
                    {campInfo.posblFcltyCl !== "\\N" && (
                      <>부대 시설 : {campInfo.posblFcltyCl}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="divide" />
            </div>
            <div className="detail_camp_map">
              <div className="detail_camp_map_title notoBold fs-30">약도</div>
              <Location
                className="detail_map_img"
                mapX={campInfo.mapX}
                mapY={campInfo.mapY}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampingDetail;
