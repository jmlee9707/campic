import React from "react";
// import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
import { v4 } from "uuid";
// import { useSelector } from "react-redux";
// import banner from "@images/temp_1.jpeg"; // banner 이미지
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

  // camplist props
  // campInfos  = [];
  const tops = ["싸피 캠핑장", "프로젝트 캠핑장", "연관검색어3", "연관검색어4"];
  const topList = tops.map(top => (
    <div
      className="camp_top_banner_favo_camp_list notoMid fs-14 flex align-center justify-center"
      key={v4()}
    >
      {top}
    </div>
  ));

  return (
    <div className="container flex justify-center">
      <div className="camp">
        <div className="camp_top_banner flex column align-center justify-center">
          <div className="opac" />
          <div className="camp_top_banner_title flex column align-center notoBold fs-40">
            <p>캠핑 준비하세요?</p>
            <p>맞춤 검색으로 찾아보세요!</p>
          </div>
          <div className="camp_top_banner_favo flex column align-center">
            <div className="camp_top_banner_favo_camp notoBold fs-14 flex align-center justify-center">
              인기 캠핑장
            </div>
            <div className="flex"> {topList}</div>
          </div>
        </div>
        {/* <div className="camp_search flex notoBold fs-32">
          <div className="camp_search_left">
            <CampingSearchAll />
          </div>
        </div> */}

        <div className="camp_type">
          <div className="camp_type_search">
            <div className="camp_type_search_text fs-32 notoBold">
              캠핑장 찾고 계신가요?
            </div>

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
          </div>
          <div className="camp_type_search flex column" />
        </div>
        <div className="camp_list flex align-center">
          <p className="camp_list_title fs-32 notoBold">캠핑장 리스트</p>
          <select type="text" className="camp_list_sort fs-22 notoMid">
            <option value=" ">거리순</option>
            <option value="favorite">인기순</option>
            <option value="word">가나다순</option>
          </select>
        </div>
        <div className="divide" />
        {/* {allList && <CampingList />} */}
        {/* <CampingList /> */}
      </div>
    </div>
  );
}

export default CampingMain;
