import React from "react";
import ShoppingCard from "./ShoppingCard";
import './ShoppingCard.scss'

function ShoppingCardList() {
  return (
    <div className="shopCardList flex">
      <ShoppingCard />
      <ShoppingCard />
    </div>
  );
}

export default ShoppingCardList;
