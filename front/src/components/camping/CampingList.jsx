import React from "react";

import CampingCard from "./CampingCard";

function CampingList() {
  return (
    <div className="flex justify-center align-center column">
      <CampingCard />
      <CampingCard />
      <CampingCard />
    </div>
  );
}

export default CampingList;
