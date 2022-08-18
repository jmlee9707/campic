import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PlanMain.scss";
import PlanUpcomingList from "@components/plan/PlanUpcomingList";
import PlanEndList from "@components/plan/PlanEndList";
import PlanIngList from "@components/plan/PlanIngList";

function PlanMain() {
  const userId = useSelector(state => state.user.email);
  useEffect(() => {
    console.log(userId);
  });
  return (
    <div className="container flex justify-center">
      <div className="plan">
        <div className="plan_title notoBold fs-40">계획하기</div>
        {userId !== null && (
          <>
            <div className="plan_coming">
              <PlanIngList />
            </div>
            <div className="divide_under" />
            <div className="plan_coming">
              <PlanUpcomingList />
            </div>
            <div className="divide_under" />
            <div className="plan_past">
              <PlanEndList />
            </div>
          </>
        )}
        {userId === null && (
          <div className="plan_login flex column align-center justify-center notoMid">
            <div className="plan_login_txt fs-32">로그인 후 이용하세요!</div>
            <Link to="/login" className="plan_login_btn fs-18 notoMid">
              로그인 하러가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanMain;
