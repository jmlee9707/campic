import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTop5, setfirstShoppingList, setSearchKeyword } from "@store/shopping";
// import { setTop5, setSearchKeyword } from "@store/shopping";
import "./shopping.scss";
import ShoppingCardList from "@components/shopping/ShoppingCardList"
import axios from "axios";


function Shopping() {
  const dispatch = useDispatch();
  const keywordRef = useRef();
  const top5 = useSelector(state => state.shopping.top5);
  const searchKeyword = useSelector(state => state.shopping.searchKeyword);
  // 인기 검색어 받아오기
  const getTop5 = () => {
    // 검색어 top5 받아오기
    axios.get("https://campic.site:8080/shop/best")
    .then(res => {
      dispatch(setTop5({top5 : res.data}));
    })
    .catch(err => console.log(err))
  }

  // 검색 정보 받아오기
  const searchItem = async () => {
    // 검색어 저장
    dispatch(setSearchKeyword({searchKeyword: keywordRef.current.value}))
    // 백엔드에서 받아오기
    axios.post("https://campic.site:8080/shop/", {
        query: keywordRef.current.value,
        start: 1,
        display: 10,
    })
    .then((res) => {
      console.log("정보", res.data);
      dispatch(setfirstShoppingList({ shoppingList: res.data }))
    })
    .catch((err) => console.log(err))
  };

  // 처음 인기검색어 받아오기
  useEffect(() => {
    getTop5();
  } , []);

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchItem();
    }
  }
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
            <input onKeyPress={handleOnKeyPress} ref={keywordRef} type="text" placeholder="캠핑 준비물을 검색하세요!" className="shop_search_input_content notoMid fs-18" />
            <button
              type="button"
              className="shop_search_input_enter notoBold fs-18"
              onClick={searchItem}
              >
                검색
              </button>
          </div>
          <div className="shop_search_hot ">
            <div className="shop_search_hot_popname flex notoBold fs-14">
              인기 검색어
            </div>
            <div className="shop_search_hot_searchname flex">
              {top5 && top5.map((item) => (
                <div className="shop_search_hot_searchname_word flex">
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {searchKeyword && <div className="shop_res">
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
        </div>}
      </div>
    </div>
  )
}

export default Shopping;
