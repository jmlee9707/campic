/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/common/Loading";
import LastList from "@components/common/LastList";
import { getCamplist } from "../../apis/camp";
import CampingCard from "./CampingCard";
import { reset, setCampList } from "../../store/camp";

function CampingList({ searchClick }) {
  const dispatch = useDispatch();
  const campInfo = useSelector(state => state.campSearch);
  const page = useSelector(state => state.campSearch.page);
  const [newPage, setNewPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const list = useSelector(state => state.campSearch.campList);
  const [ref, inView] = useInView();
  const [last, setLast] = useState(false);
  async function getAndSetCampList() {
    const res = await getCamplist({
      arrange: campInfo.arrange,
      keyword: campInfo.keyword,
      sido: campInfo.sido,
      gugun: campInfo.gugun,
      tags: campInfo.tag,
      page
    });
    dispatch(setCampList({ campList: res }));
    setLoading(false);
    if (res.length >= 0 && res.length < 10) {
      setLast(true);
      setLoading(false);
    }
  }
  // page 달라질때마다 요청보내기
  useEffect(() => {
    getAndSetCampList();
  }, [newPage]);

  // 사용자가 마지막 요소를 보고 있고 로딩 중이 아니라면
  useEffect(() => {
    if (inView && !loading && !last) {
      setLoading(true);
      setNewPage(newPage + 1);
    }
  }, [inView, loading]);

  return (
    <div className="">
      {list.length !== 0 &&
        list.map(({ campId, facltNm, addr1, homepage, firstImageUrl }) => (
          <CampingCard
            key={v4()}
            campId={campId}
            facltNm={facltNm}
            addr1={addr1}
            homepage={homepage}
            firstImageUrl={firstImageUrl}
          />
        ))}
      {!last && list.length !== 0 && loading ? (
        <Loading />
      ) : (
        <div ref={ref} className="obe" />
      )}
      {last && <LastList />}
    </div>
  );
}

export default CampingList;
