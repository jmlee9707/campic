import React from "react";
import './ShoppingCard.scss'
// import dummy from "@images/coco.jpeg";

function ShoppingCard({title, image, link, lprice}) {
  return (
    <div className="shop_card flex justify-center">
      <img className="shop_card_img" src={image} alt="상품이미지" />
      <div className="shop_card_name notoBold fs-32">{title.split("<b>")[0]}</div>
      <div className="shop_card_etc flex">
        <p className="shop_card_etc_price notoMid fs-24">{lprice}</p>
        <button type="button" className="shop_card_etc_btn notoBold fs-20"><a href={link} >구매하러 가기</a></button>
      </div>
    </div>
  );
}

export default ShoppingCard;
