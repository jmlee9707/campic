import "./ShoppingCard.scss";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { setShoppingList } from "@store/shopping";
import Loading from "@components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import LastList from "@components/common/LastList";
import ShoppingCard from "./ShoppingCard";

function ShoppingCardList() {
  const dispatch = useDispatch();
  const searchKeyword = useSelector(state => state.shopping.searchKeyword);
  const list = useSelector(state => state.shopping.shoppingList);
  const isEnd = useSelector(state => state.shopping.isEnd);

  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAndSetCampList() {
    axios
      .post("https://campic.site:8080/shop/", {
        query: searchKeyword,
        start: page + 1,
        display: 10
      })
      .then(res => {
        dispatch(setShoppingList({ shoppingList: res.data }));
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (page > 0) {
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
    <div>
      <div className="flex justify-space-between flex-wrap">
        {list.length !== 0 &&
          list.map(({ title, image, link, lprice }) => (
            <ShoppingCard
              key={v4()}
              title={title}
              image={image}
              link={link}
              lprice={lprice}
            />
          ))}
        {!isEnd && loading ? <Loading /> : <div ref={ref} className="obe" />}
      </div>
      {isEnd && <LastList />}
    </div>
  );
}

export default ShoppingCardList;
