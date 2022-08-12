import React, { useEffect } from "react";
import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
// import { getCampList } from "@apis/camp";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import {
  CampingSearchLoca,
  CampingSearchTag,
  CampingSearchAll
} from "@components/camping/CampingSearch";
import { setLocation, reset, setArrangeConditions } from "@store/camp";

function CampingMain() {
  const dispatch = useDispatch();
  // const [campInfo, setCampInfo] = useState([]);
  // campInfo 생성
  dispatch(reset()); // reduc 초기화
  // setCampInfo(result);

  // 위도 경도 받아오기 함수
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(
            setLocation({
              lati: position.coords.latitude,
              longi: position.coords.longitude
            })
          );
        },
        err => console.log(err),
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  // use effect
  useEffect(() => {
    getLocation();
  }, []);

  const tops = ["싸피 캠핑장", "프로젝트 캠핑장", "연관검색어3", "연관검색어4"];
  const topList = tops.map(top => (
    <div
      className="camp_top_banner_favo_camp_list notoMid fs-14 flex align-center justify-center"
      key={v4()}
    >
      {top}
    </div>
  ));

  const clickCamp = () => {
    dispatch(reset()); // 페이지와 리스트 0으로 돌리기
  };

  // useEffect(() => {
  //   async function getList() {
  //     setCampInfo(result);
  //     console.log(campInfo);
  //   }
  //   getList();
  // }, []);

  // 정렬 어떻게 할것인지?
  const arrangeClick = e => {
    const arrange = e.target.value;
    console.log(arrange);
    dispatch(reset());
    console.log("aaa");
    dispatch(setArrangeConditions({ arrange })); // 왜 정렬이 안될까요?
  };

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
        <div className="camp_type">
          <div className="camp_type_search">
            <div className="flex camp_type_search_text">
              <div className="camp_type_search_text fs-32 notoBold flex">
                캠핑장 찾고 계신가요?
              </div>
              <button
                onClick={clickCamp}
                type="button"
                className="flex align-center fs-16 camp_type_search_text_btn justify-center"
              >
                검색
              </button>
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
          <select
            id="camp_arrange"
            type="text"
            onChange={arrangeClick}
            className="camp_list_sort fs-22 notoMid"
          >
            <option value="0">가나다순</option>
            <option value="1">인기순</option>
            <option value="2">거리순</option>
          </select>
        </div>
        <div className="divide" />
        {/* {allList && <CampingList />} */}
        <CampingList searchClick={clickCamp} />
      </div>
    </div>
  );
}

export default CampingMain;
