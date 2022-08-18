import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CampingCard.scss";
import AddPlanModal from "@components/camping/AddPlanModal";
import coverImg from "@images/noimage.png"; // url string으로 가져오기
import placeIcon from "@images/icon/place_black_24dp.svg";

function CampingCard({ campId, facltNm, addr1, homepage, firstImageUrl }) {
  const moveSite = () => {
    window.open(`${homepage}`);
  };

  const detailUrl = `/camping/detail/${campId}`;

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <div className="camping_card flex column">
      <Link to={detailUrl} className="camping_card_img">
        {firstImageUrl === "\\N" && (
          <img
            className="camping_card_img_cover"
            src={coverImg}
            alt="coverImg"
          />
        )}
        {firstImageUrl !== "\\N" && (
          <img
            className="camping_card_img_cover"
            src={firstImageUrl}
            alt="coverImg"
          />
        )}
      </Link>

      <div className="camping_card_info flex ">
        <div className="camping_card_info_txt">
          <p className="camping_card_info_txt_name notoBold fs-30">{facltNm}</p>
          <div className="camping_card_info_txt_place flex align-center">
            <div className="camping_card_info_txt_place_icon">
              <img src={placeIcon} alt="icon" type="button" />
            </div>
            <div className="camping_card_info_txt_place_text notoMid fs-22">
              {addr1}
            </div>
          </div>
        </div>

        <div className="camping_card_info_btn">
          <button
            onClick={openModal}
            type="button"
            className="camping_card_info_btn_plan notoBold fs-20"
          >
            일정에 추가하기
          </button>
          {homepage !== null && homepage !== "\\N" && (
            <button
              type="button"
              className="camping_card_info_btn_move notoBold fs-20"
              onClick={moveSite}
            >
              사이트 바로가기
            </button>
          )}
        </div>
      </div>
      <div className="divide" />
      {modalVisible && (
        <AddPlanModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          campId={campId}
          facltNm={facltNm}
        />
      )}
    </div>
  );
}

export default CampingCard;
