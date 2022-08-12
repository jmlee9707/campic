import React, { useEffect } from "react";
// import React, { useEffect, useState } from "react";
// import CampingList from "@components/camping/CampingList";
import "./CampingMain.scss";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
// import { useSelector } from "react-redux";
// import banner from "@images/temp_1.jpeg"; // banner 이미지
import {
  CampingSearchLoca,
  CampingSearchTag,
  CampingSearchAll
} from "@components/camping/CampingSearch";
// import { click } from "../../store/camp";
import { setLocation, reset, setArrangeConditions } from "@store/camp";

function CampingMain() {
  const dispatch = useDispatch();
  // const top = "싸피 캠핑장";
  // const allList = useSelector(state => state.campSearch.click.allClick);
  // const keywordList = useSelector(state => state.campSearch.click.keywordClick);

  // camplist props
  // campInfos  = [];

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
    // console.log("위치정보");
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

  const searchCamp = () => {
    // 초기화면으로 돌리기
    reset();
  };

  const arrangeClick = () => {
    const arrange = document.getElementById("camp_arrange");

    dispatch(
      setArrangeConditions({
        arrange: arrange.options[arrange.selectedIndex].value
      })
    );
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
                onClick={searchCamp}
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
        {/* <CampingList /> */}
      </div>
    </div>
  );
}

export default CampingMain;
