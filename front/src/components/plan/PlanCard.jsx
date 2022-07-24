import React from "react";
import "./PlanCard.scss";
// import PropTypes from "prop-types";
import planImg from "@images/temp_1.jpeg";

function CampingCard() {
  const name = "프로젝트 부수기 여행";
  const place = "수완동 캠핑장";
  const start = "22.07.15(금)";
  const final = "22.07.15(금)";
  return (
    <div className="card flex column">
      <div className="card_img">
        <img src={planImg} alt="coverImg" />
      </div>

      <div className="card_txt flex column">
        <div className="card_txt_place notoBold fs-16">{place}</div>
        <div className="card_txt_name notoBold fs-24">{name}</div>
        <div className="card_txt_day notoMid fs-14">
          {start} ~ {final}
        </div>
      </div>
    </div>
    // <>dd</>
  );
}

export default CampingCard;
