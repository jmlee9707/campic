import React from "react";
import './ShoppingCard.scss'
import dummy from "@images/coco.jpeg";

function ShoppingCard({test}) {
  return (
    <div className="shop_card flex justify-center">
      <img className="shop_card_img" src={dummy} alt="상품이미지" />
      <div className="shop_card_name notoBold fs-32">{test}</div>
      <div className="shop_card_etc flex">
        <p className="shop_card_etc_price notoMid fs-24">140,000원</p>
        <button type="button" className="shop_card_etc_btn notoBold fs-20">구매하러 가기</button>
      </div>
    </div>
  );
}

export default ShoppingCard;
