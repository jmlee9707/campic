import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { getUpcomingPlan } from "../../apis/plan";
import PlanCard from "./PlanCard";

function PlanUpcomingList() {
  const userId = useSelector(state => state.user.email);

  const [list, setList] = useState([]); 
  const now = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]; 
  useEffect(() => {
    async function getList() {
      const res = await getUpcomingPlan(userId, now);
      setList(res);
    }
    getList();
  }, []);
  return (
    <div className="flex column">
      <div className="plan_coming_title notoBold fs-28">
        곧 다가올 캠핑이에요!
      </div>
      <div className="flex">
        {list.length !== 0 &&
          list.map(
            ({
              savedTitle,
              startDate,
              endDate,
              campId,
              saveId,
              firstImageUrl
            }) => (
              <PlanCard
                key={v4()}
                savedTitle={savedTitle}
                startDate={startDate.substr(0, 10)}
                endDate={endDate.substr(0, 10)} 
                campId={campId}
                saveId={saveId}
                firstImageUrl={firstImageUrl}
              />
            )
          )}
        {list.length === 0 && (
          <div className="none_upcoming flex column align-center">
            <div className="none_upcoming_txt notoMid fs-22 ">
              계획중인 캠핑이 없습니다 ㅠㅅㅠ
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanUpcomingList;
