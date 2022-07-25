import React from "react";

import PlanCard from "./PlanCard";

function PlanList() {
  return (
    <div className="flex align-center">
      <PlanCard />
      <PlanCard />
      <PlanCard />
      {/* <PlanCard /> */}
    </div>
  );
}

export default PlanList;
