import React from "react";
import "./PlanCard.scss";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import planImg from "@images/temp_1.jpeg";

function PlanCard({
  savedTitle,
  place,
  startDate,
  endDate,
  campId,
  saveId,
  firstImageUrl,
  past
}) {
  console.log(campId);
  console.log(firstImageUrl);

  const isPast = () => {
    const prefix = "card_img";
    return past ? `${prefix} active` : `${prefix} unactive`;
  };
  return (
    <Link to={`/plan/detail/${saveId}`}>
      <div className="card column">
        <div className={() => isPast()}>
          {firstImageUrl === "\\N" && <img src={planImg} alt="coverImg" />}
          {firstImageUrl !== "\\N" && (
            <img src={firstImageUrl} alt="coverImg" />
          )}
        </div>

        <div className="card_txt flex column">
          <div className="card_txt_place notoBold fs-16">{place}</div>
          <div className="card_txt_name notoBold fs-24">{savedTitle}</div>
          <div className="card_txt_day notoMid fs-14">
            {startDate} ~ {endDate}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlanCard;
