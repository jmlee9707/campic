import React from "react";
import { Link } from "react-router-dom";
import "./CampingCard.scss";
// import PropTypes from "prop-types";
import coverImg from "@images/temp_1.jpeg"; // url string으로 가져오기
import placeIcon from "@images/icon/place_black_24dp.svg";

function CampingCard() {
  const name = "수완동 캠핑장";
  const place = "광주광역시 광산구 수완동 1111-1111";
  const url = "https://naver.com";
  //   const navigate = useNavigate();
  //   const moveDetail = () => {
  //     navigate("/camping/detail"); // 상세페이지 이동
  //     console.log("clicked");
  //   };

  const moveSite = () => {
    window.open(`${url}`);
  };

  return (
    <div className="camping_card flex column">
      <div className="camping_card_img">
        <img className="camping_card_img_cover" src={coverImg} alt="coverImg" />
      </div>

      <div className="camping_card_info flex align-center">
        <div className="camping_card_info_txt">
          <p className="camping_card_info_txt_name notoBold fs-30">{name}</p>
          <div className="camping_card_info_txt_place flex align-center">
            <Link to="/">
              <img
                src={placeIcon}
                alt="icon"
                className="camping_card_info_txt_place_icon"
                type="button"
              />
            </Link>
            <div className="camping_card_info_txt_place_text notoMid fs-22">
              {place}
            </div>
          </div>
        </div>

        <div className="camping_card_info_btn">
          <button
            type="button"
            className="camping_card_info_btn_plan notoBold fs-20"
          >
            일정에 추가하기
          </button>
          <button
            type="button"
            className="camping_card_info_btn_move notoBold fs-20"
            onClick={moveSite}
          >
            사이트 바로가기
          </button>
        </div>
      </div>
      <div className="divide" />
    </div>
    // <>dd</>
  );
}

// Campingcamping_Card.propTypes = {
//   data: PropTypes.obectOf(PropTypes.string).isRequired
// };

export default CampingCard;
