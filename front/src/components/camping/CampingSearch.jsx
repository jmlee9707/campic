import React from "react";
import "./CampingSearch.scss";

export function CampingSearchLoca() {
  return (
    <div className="search_loca">
      <select type="text" className="fs-16 notoMid">
        <option value="">도</option>
      </select>
      <select type="text" className="fs-16 notoMid">
        <option value="">시/군/구</option>
      </select>
      <button type="button" className="fs-18 notoBold">
        검색
      </button>
    </div>
  );
}

export function CampingSearchTag() {
  const tags = [
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
  const tagList = tags.map(tag => (
    <button type="button" className="fs-18 notoMid">
      {tag}
    </button>
  ));
  return (
    <div className="search_tag flex">
      <div className="search_tag_list">{tagList}</div>
      <div className="search_tag_fin">
        <button type="button" className="fs-18 notoBold">
          검색
        </button>
      </div>
    </div>
  );
}

export const ex = () => {};
