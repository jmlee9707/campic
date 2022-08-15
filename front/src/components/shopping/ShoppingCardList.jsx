import './ShoppingCard.scss'
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { setShoppingList } from "@store/shopping"
import Loading from "@components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import ShoppingCard from "./ShoppingCard";

function ShoppingCardList() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector(state => state.shopping.searchKeyword);
  const list = useSelector(state => state.shopping.shoppingList);
  
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAndSetCampList() {
    // console.log(searchKeyword);
    // 리스트 받아오기
    axios.post("https://campic.site:8080/shop/", {
        query: searchKeyword,
        start: page + 1,
        display: 10,
    })
    .then((res) => {
      // dispatch(setfirstShoppingList({ shoppingList: [{"test" : 1}, {"test": 2}] }))
      dispatch(setShoppingList({ shoppingList: res.data }));
      setLoading(false);
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (page > 0){
      getAndSetCampList();
    }
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
    }
  }, [inView, loading]);

  return (
    <div className="flex justify-space-between flex-wrap">
      {list.length !== 0 &&
        list.map(({title, image, link, lprice}) => (
          <ShoppingCard
            key={v4()}
            title={title}
            image={image}
            link={link}
            lprice={lprice}
          />
        ))}
      {loading ? <Loading /> : <div ref={ref} className="obe" />}
    </div>
  );
}

export default ShoppingCardList;
