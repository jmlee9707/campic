import React, { useState, useRef, useEffect } from "react";
import "./CampingSearch.scss";
import search from "@images/icon/search_black_24dp.svg";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  getSido,
  searchAll,
  getGun,
  searchLocation,
  searchTag
} from "../../apis/camp";
import { reset, setTagConditions, setLocaConditions } from "../../store/camp";

export function CampingSearchAll() {
  const dispatch = useDispatch();
  const keywordRef = useRef();
  const searchKeyword = async () => {
    const keyword = keywordRef.current.value;
    // async function searchCampWord() {
    dispatch(reset());
    const res = await searchAll(`${encodeURIComponent(keyword)}`);
    console.log(res);
    // }
  };
  const tops = ["싸피 캠핑장", "연관검색어2", "연관검색어3", "연관검색어4"];
  const topList = tops.map(top => (
    <div
      className="main_title_left_word_detail flex align-center justify-center"
      key={v4()}
    >
      {top}
    </div>
  ));
  return (
    <>
      <div className="main_title_left_txt">캠핑장 찾고 계신가요?</div>
      <div className="main_title_left_search flex">
        <input
          ref={keywordRef}
          type="text"
          className="main_title_left_search_input notoMid fs-16"
          placeholder="캠핑장을 검색해주세요"
        />
        <button
          onClick={searchKeyword}
          type="button"
          className="main_title_left_search_btn flex align-center justify-center"
        >
          <img src={search} alt="button" />
        </button>
      </div>
      <div className="main_title_left_word flex fs-14 notoMid">{topList}</div>
    </>
  );
}

// ==================================
// 지역별 검색 컴포넌트
export function CampingSearchLoca() {
  const dispatch = useDispatch();
  const [doCodeList, setDoCodeList] = useState([]); // 시코드
  const [gunCodeList, setGunCodeList] = useState([]); // 군구 코드
  const [doName, setDoName] = useState("");
  const [gunName, setGunName] = useState("");

  useEffect(() => {
    async function getSidoCode() {
      setDoCodeList([]); // 초기화
      const res = await getSido();
      setDoCodeList(res);
    }
    getSidoCode();
  }, []);

  // 시 선택 변화
  const onSiChange = async e => {
    const doCode = e.target.value; // 도코드
    const res = await getGun(doCode.substr(0, 2));
    setGunCodeList(res);
    const tempName = document.getElementById("sido_select");
    setDoName(tempName.options[tempName.selectedIndex].text);
    console.log(doName);
  };

  // 군구 선택 변화
  const onGunChange = async () => {
    const tempName = document.getElementById("gugun_select");
    setGunName(tempName.options[tempName.selectedIndex].text);
    console.log(gunName);
  };

  // 지역별 검색
  const searchLoca = async () => {
    const res = await searchLocation(
      `${encodeURIComponent(doName)}`,
      `${encodeURIComponent(gunName)}`
    );
    console.log(res);
    // redux에 location 값 전달
    dispatch(setLocaConditions({ sido: doName, gugun: gunName }));
  };

  return (
    <div className="search_loca">
      <select
        id="sido_select"
        // value={doCodeList}
        onChange={onSiChange}
        // onClick={getSidoList}
        type="text"
        className="fs-16 notoMid"
        multiple={false}
        defaultValue="도"
      >
        <option value="default" onChange={onSiChange}>
          시/도
        </option>
        {doCodeList.map(item => (
          <option value={item.sidoCode} onChange={onSiChange}>
            {item.sidoName}
          </option>
        ))}
      </select>

      <select
        // value={gunCodeList}
        onChange={onGunChange}
        id="gugun_select"
        mutiple={false}
        type="text"
        className="fs-16 notoMid"
        defaultValue="시/군/구"
      >
        <option value="default" onChange={onGunChange}>
          군/구
        </option>
        {gunCodeList.map(item => (
          <option value={item.gugunCode} onChange={onGunChange}>
            {item.gugunName}
          </option>
        ))}
      </select>
      <button type="button" className="fs-18 notoBold" onClick={searchLoca}>
        검색
      </button>
    </div>
  );
}
// ==================================
// 태그별 검색 컴포넌트
export function CampingSearchTag() {
  const dispatch = useDispatch();
  const tagsData = [
    "가을",
    "가을단풍명소",
    "강",
    "걷기 길",
    "겨울",
    "겨울눈꽃명소",
    "계곡",
    "글램핑",
    "낚시",
    "난방기구",
    "놀이터",
    "도심",
    "마트/편의점",
    "무선인터넷",
    "물놀이장",
    "반려견가능",
    "반려견불가능",
    "봄",
    "봄꽃여행",
    "산",
    "산책로",
    "섬",
    "수상레저",
    "숲",
    "스키",
    "액티비티",
    "여름",
    "여름물놀이",
    "온수",
    "운동시설",
    "운동장",
    "일몰명소",
    "일반야영장",
    "일출명소",
    "자동차야영장",
    "장작판매",
    "전기",
    "카라반",
    "트렘폴린",
    "항공레저",
    "해변",
    "호수",
    "장비대여"
  ];

  // const [selectTags, setSelectTags] = useState([]); // 선택된 태그들 보내기
  const selectTags = useSelector(state => state.campSearch.tag);

  const tagSelects = value => {
    const index = selectTags.indexOf(value);
    // 선택되지 않았다면
    if (index === -1) {
      // setSelectTags([...selectTags, value]);
      // console.log([...selectTags, value]);
      // dispatch(setTagConditions(value)); // dispatch로 tags 관리
      dispatch(setTagConditions([...selectTags, value]));
    } else {
      // setSelectTags(selectTags.filter(tag => tag !== value));
      dispatch(setTagConditions(selectTags.filter(tag => tag !== value)));
    }
    // console.log(selectTags);
  };

  // tag class 이름
  const selectTagClass = value => {
    const prefix = "fs-18 notoMid";
    if (selectTags.indexOf(value) === -1) {
      return prefix;
    }
    return `${prefix} selected`;
  };

  // 태그 리스트 컴포넌트
  const tagList = tagsData.map(tag => (
    <button
      type="button"
      className={selectTagClass(tag)}
      key={v4()}
      onClick={() => tagSelects(tag)}
    >
      {tag}
    </button>
  ));

  const searchTags = async () => {
    const res = await searchTag(`${encodeURIComponent(selectTags)}`);
    console.log(res);
  };
  return (
    <div className="search_tag flex">
      <div className="search_tag_list" onChange={searchTags}>
        {tagList}
      </div>
      {/* <div className="search_tag_fin">
        <button type="button" className="fs-18 notoBold" onChange={searchTags}>
          검색
        </button>
      </div> */}
    </div>
  );
}

export const ex = () => {};
