import React, { useEffect, useState } from "react";
import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import {
  CampingSearchLoca,
  CampingSearchTag,
  CampingSearchAll
} from "@components/camping/CampingSearch";
import { searchBest } from "@apis/camp";
import { reset, resetLoca, setArrangeConditions } from "@store/camp";

function CampingMain() {
  const dispatch = useDispatch();
  dispatch(reset()); 
  dispatch(resetLoca());

  const [fold, setFold] = useState(false);
  const [isFold, setIsFold] = useState("상세 접기");

  const [tops, setTops] = useState([]);
  useEffect(() => {
    async function getTops() {
      const res = await searchBest();
      setTops(res);
    }
    getTops();
  }, []);
  const topList = tops.map(top => (
    <div
      className="camp_top_banner_favo_camp_list notoMid fs-14 flex align-center justify-center"
      key={v4()}
    >
      {top}
    </div>
  ));

  const clickCamp = () => {
    dispatch(reset()); 
  };

  const arrangeClick = e => {
    const arrange = e.target.value;

    dispatch(setArrangeConditions({ arrange })); 
    clickCamp();
  };
  const foldTag = () => {
    if (fold === true) {
      setIsFold("상세 접기");
      setFold(false);
    } else {
      setIsFold("열기");
      setFold(true);
    }
  };

  return (
    <div className="container flex justify-center">
      <div className="camp">
        <div className="camp_top_banner flex column">
          <div className="camp_top_banner_favo flex column align-center">
            <div className="camp_top_banner_favo_camp notoBold fs-14 flex align-center justify-center">
              인기 캠핑장
            </div>
            <div className="flex"> {topList}</div>
          </div>
        </div>
        <div className="camp_type">
          <div className="camp_type_search">
            <div className="flex camp_type_search_text">
              <div className="camp_type_search_text fs-32 notoBold flex">
                캠핑장 찾고 계신가요?
              </div>
              <div className="flex">
                <button
                  onClick={foldTag}
                  type="button"
                  className="flex align-center fs-16 camp_type_search_text_btn_fold justify-center"
                >
                  {isFold}
                </button>
                <button
                  onClick={clickCamp}
                  type="button"
                  className="flex align-center fs-16 camp_type_search_text_btn justify-center"
                >
                  검색
                </button>
              </div>
            </div>
            {!fold && (
              <div className="camp_type_search_select">
                <div className="camp_type_search_select_box flex">
                  <button
                    type="button"
                    className="camp_type_search_select_box_btn notoBold fs-16"
                  >
                    지역별
                  </button>
                  <CampingSearchLoca />
                </div>
                <div className="camp_type_search_select_box flex">
                  <button
                    type="button"
                    className="camp_type_search_select_box_btn notoBold fs-16"
                  >
                    이름
                  </button>
                  <CampingSearchAll />
                </div>
                <div className="camp_type_search_select_box flex">
                  <button
                    type="button"
                    className="camp_type_search_select_box_btn notoBold fs-16"
                  >
                    태그별
                  </button>
                  <CampingSearchTag />
                </div>
              </div>
            )}
          </div>
          <div className="camp_type_search flex column" />
        </div>
        <div className="camp_list flex align-center">
          <p className="camp_list_title fs-32 notoBold">캠핑장 리스트</p>
          <select
            id="camp_arrange"
            type="text"
            onChange={arrangeClick}
            className="camp_list_sort fs-20 notoMid"
          >
            <option value="0">가나다순</option>
            <option value="1" selected>
              인기순
            </option>
          </select>
        </div>
        <div className="divide" />
        <CampingList searchClick={clickCamp} />
      </div>
    </div>
  );
}

export default CampingMain;
