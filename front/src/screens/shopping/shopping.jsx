import React from "react";
import "./shopping.scss";

import ShoppingCardList from "../../components/shopping/ShoppingCardList";

function Shopping() {
  return (
    <div className="container flex">
      <div className="shop">
        <div className="shop_search flex justify-center">
          {/* <div className="opac" /> */}
          <div className="shop_search_tit flex column align-center justify-center">
            <div className="shop_search_title1 notoBold fs-40">캠핑에 필요한 준비물?</div>
            <div className="shop_search_title2 notoBold fs-52">캠픽에서 찾아보세요!</div>
          </div>
          <div className="shop_search_input flex align-center">
            <input type="text" placeholder="캠핑 준비물을 검색하세요!" className="shop_search_input_content notoMid fs-18" />
            <button type="button" className="shop_search_input_enter notoBold fs-18">검색</button>
          </div>
          <div className="shop_search_hot ">
            <div className="shop_search_hot_popname flex notoBold fs-14">
              인기 검색어
            </div>
            <div className="shop_search_hot_searchname flex">
              <div className="shop_search_hot_searchname_one flex">
                텐트
              </div>
              <div className="shop_search_hot_searchname_two flex">
                해먹
              </div>
              <div className="shop_search_hot_searchname_three flex">
                감성조명
              </div>
              <div className="shop_search_hot_searchname_four flex">
                미니화로
              </div>
            </div>
          </div>
        </div>
        <div className="shop_res">
          <div className="shop_res_title">
            <p className="shop_res_title_tit1 notoBold fs-32">
              검색결과
            </p>
            <p className="shop_res_title_tit2 notoMiod fs=16">
              (검색어)와 관련된 쇼핑 리스트입니다!
            </p>
          </div>
          <div className="divide" />
          <div className="shop_res_comp">
            <ShoppingCardList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shopping;
