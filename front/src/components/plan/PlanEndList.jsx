import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import PlanCard from "@components/plan/PlanCard";
import { getEndPlan } from "../../apis/plan";

function PlanEndList() {
  const userId = useSelector(state => state.user.email);
  console.log(userId);
  //   const past = true;
  const [list, setList] = useState([]); // 리스트 불러오기
  const now = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]; // 현재시간
  useEffect(() => {
    async function getList() {
      const res = await getEndPlan(userId, now);
      setList(res);
    }
    getList();
  }, []);
  return (
    <div className="flex align-center">
      {list.length !== 0 &&
        list.map(
          ({ savedTitle, place, startDate, endDate, campId, saveId }) => (
            <PlanCard
              className="past_img"
              key={v4()}
              savedTitle={savedTitle}
              place={place}
              startDate={startDate.substr(0, 10)} // 문자열 자르기
              endDate={endDate.substr(0, 10)} // 문자열 자르기
              campId={campId}
              saveId={saveId}
            />
          )
        )}
    </div>
  );
}

export default PlanEndList;
