/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { getCamplist } from "../../apis/camp";
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import CampingCard from "./CampingCard";
import { reset, setCampList } from "../../store/camp";

function CampingList() {
  const dispatch = useDispatch();
  // const [campList, setCampList] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false);
  const list = useSelector(state => state.campSearch.campList);
  const [ref, inView] = useInView();
  console.log(list, dispatch);
  useEffect(async () => {
    dispatch(setCampList("123"));
    // async function getAndSetCampList() {
    const res = await getCamplist();
    dispatch(setCampList([...list, res.list]));
    //   // setCampList(res.slice(10));
    //   // setCampList([...campList, ...res]);
    //   // dispatch(reset());
    //   // dispatch(
    //   //   search({
    //   //     page,
    //   //     campList
    //   //   })
    //   // );
    // }
    // getAndSetCampList();
    setLoading(false);
  }, [page]);

  // 사용자가 마지막 요소를 보고 있고 로딩 중이 아니라면
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
    }
  }, [inView, loading]);

  return (
    <div className="">
      {/* {campList.length !== 0 &&
        campList.map(({ campId, facltNm, addr1, homepage, firstImageUrl }) => (
          <CampingCard
            key={v4()}
            campId={campId}
            facltNm={facltNm}
            addr1={addr1}
            homepage={homepage}
            firstImageUrl={firstImageUrl}
          />
        ))} */}

      {loading ? <div>로딩중</div> : <div ref={ref} className="obe" />}
    </div>
  );
}

export default CampingList;
