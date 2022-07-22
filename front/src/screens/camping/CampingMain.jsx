import React, { useState } from "react";
import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
import banner from "@images/temp_1.jpeg"; // banner 이미지
import search from "@images/icon/search_black_24dp.svg";

import {
  CampingSearchLoca,
  CampingSearchTag
} from "@components/camping/CampingSearch";

function CampingMain() {
  // const top = "싸피 캠핑장";
  const [visibleTag, setVisibleTag] = useState(true);
  const [visibleLoca, setVisibleLoca] = useState(false);
  const tops = ["싸피 캠핑장", "연관검색어2", "연관검색어3", "연관검색어4"];
  const topList = tops.map(top => (
    <div className="main_title_left_word_detail flex align-center justify-center">
      {top}
    </div>
  ));
  return (
    <div className="container flex justify-center">
      <div className="main">
        <div className="main_title flex notoBold fs-32">
          <div className="main_title_left">
            <div className="main_title_left_txt">캠핑장 찾고 계신가요?</div>
            <div className="main_title_left_search flex">
              <input
                type="text"
                className="main_title_left_search_input notoMid fs-16"
                placeholder="캠핑장을 검색해주세요"
              />
              <button
                type="button"
                className="main_title_left_search_btn flex align-center justify-center"
              >
                <img src={search} alt="button" />
              </button>
            </div>
            <div className="main_title_left_word flex fs-14 notoMid">
              {topList}
            </div>
          </div>
          <div className="main_title_right">
            <img src={banner} alt="banner" title="banner" />
          </div>
        </div>
        <div className="main_type">
          <div className="main_type_title flex align-center">
            <div className="main_type_title_txt  fs-32 notoBold">맞춤 검색</div>
            <div className="main_type_title_select">
              {/* 토글로 할까 버튼으로 할까~ */}
              <button
                type="button"
                className={
                  visibleTag
                    ? "main_type_title_select_tag_t notoBold fs-16"
                    : "main_type_title_select_tag_f notoBold fs-16"
                }
                onClick={() => {
                  setVisibleTag(true);
                  setVisibleLoca(false);
                }}
              >
                태그별
              </button>
              <button
                type="button"
                className={
                  visibleLoca
                    ? "main_type_title_select_loca_t notoBold fs-16"
                    : "main_type_title_select_loca_f notoBold fs-16"
                }
                onClick={() => {
                  setVisibleLoca(true);
                  setVisibleTag(false);
                }}
              >
                지역별
              </button>
            </div>
          </div>
          <div className="main_type_search flex">
            {visibleLoca && <CampingSearchLoca />}
            {visibleTag && <CampingSearchTag />}
          </div>
        </div>
        <div className="main_list flex align-center">
          <p className="main_list_title fs-32 notoBold">캠핑장 리스트</p>
          <select type="text" className="main_list_sort fs-22 notoMid">
            <option selected>최신순</option>
            <option>인기순</option>
          </select>
        </div>
        <div className="divide" />
        <CampingList />
      </div>
    </div>
  );
}

export default CampingMain;
