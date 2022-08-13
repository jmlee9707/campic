import React, { useState } from "react";
import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
// import { useSelector } from "react-redux";
import banner from "@images/temp_1.jpeg"; // banner 이미지
import {
  CampingSearchLoca,
  CampingSearchTag,
  CampingSearchAll
} from "@components/camping/CampingSearch";
// import { click } from "../../store/camp";

function CampingMain() {
  // const dispatch = useDispatch();
  // const top = "싸피 캠핑장";
  // dispatch(click( allList: true ));
  // const allList = useSelector(state => state.campSearch.click.allClick);
  // const keywordList = useSelector(state => state.campSearch.click.keywordClick);
  // const [tagList, setTagList] = useState(false);
  // const [locaList, setLocaList] = useState(false);
  const [visibleTag, setVisibleTag] = useState(true);
  const [visibleLoca, setVisibleLoca] = useState(false);

  // camplist props
  // campInfos  = [];

  return (
    <div className="container flex justify-center">
      <div className="main">
        <div className="main_title flex notoBold fs-32">
          <div className="main_title_left">
            <CampingSearchAll />
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
            <option value=" ">거리순</option>
            <option value="favorite">인기순</option>
            <option value="word">가나다순</option>
          </select>
        </div>
        <div className="divide" />
        {/* {allList && <CampingList />} */}
        <CampingList />
      </div>
    </div>
  );
}

export default CampingMain;
