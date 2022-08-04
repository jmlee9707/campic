import React from "react";
import "./PlanMain.scss";
import PlanList from "@components/plan/PlanList";

function PlanMain() {
  return (
    <div className="container flex justify-center">
      <div className="plan ">
        <div className="plan_title notoBold fs-40">계획하기</div>
        <div className="plan_coming">
          <div className="plan_coming_title notoBold fs-28">
            곧 다가올 캠핑이에요!
          </div>
          <PlanList />
        </div>
        <div className="divide" />
        <div className="plan_past">
          <div className="plan_past_title notoBold fs-28">
            지난 캠핑 어떠셨나요?
          </div>
          <PlanList className="pastImg" />
        </div>
      </div>
    </div>
  );
}

export default PlanMain;
