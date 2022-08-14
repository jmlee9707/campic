import './ShoppingCard.scss'
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { setShoppingList } from "@store/shopping"
import Loading from "@components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import ShoppingCard from "./ShoppingCard";

function ShoppingCardList() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector(state => state.shopping.searchKeyword);
  const list = useSelector(state => state.shopping.shoppingList);
  
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAndSetCampList() {
    console.log(searchKeyword);
    // 리스트 받아오기
    dispatch(setShoppingList({ shoppingList: [{"test": 1}, {"test": 2}] }));
    setLoading(false);
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
        list.map(({test}) => (
          <ShoppingCard
            key={v4()}
            test={test}

          />
        ))}
      {loading ? <Loading /> : <div ref={ref} className="obe" />}
    </div>
  );
}

export default ShoppingCardList;
