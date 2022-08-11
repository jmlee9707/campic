import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useInView } from "react-intersection-observer";
import CommunityPhotoCard from "./CommunityPhotoCard";
// import "./CommunityPhotoCard.scss";
import { getPhoto } from "../../apis/photo";
// import { Link } from "react-router-dom";

function CommunityPhotoList() {
  const [photoList, setPhotoList] = useState([]); // 불러온 데이터 저장

  const [page, setPage] = useState(0); // 현재페이지
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  async function getPhotoList() {
    const res = await getPhoto(page);
    console.log(res);
    setPhotoList([...photoList, ...res]);
    console.log(photoList);
    setLoading(false);
  }

  // useEffect(() => {
  // async function getPhotoList() {
  //   console.log(page);
  //   const res = await getPhoto(page);
  //   console.log(res);
  //   setPhotoList([...photoList, ...res]);
  //   console.log(photoList);
  // }
  // getPhotoList();

  // setLoading(false);
  // }, [page]);

  // 사용자가 마지막 요소를 보고 있고 로딩 중이 아니라면
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
      console.log(page);
      getPhotoList();
    }
  }, [inView, loading]);
  // console.log(ref);

  return (
    <div className="comp flex">
      {photoList.length !== 0 &&
        photoList.map(
          ({
            blobFile,
            profileImgPath,
            boardId,
            nickname,
            content,
            like,
            click
          }) => (
            <CommunityPhotoCard
              key={v4()}
              boardId={boardId}
              blobFile={blobFile}
              nickname={nickname}
              content={content}
              profileImgPath={profileImgPath}
              like={like}
              click={click}
            />
          )
        )}
      {loading ? <div>로딩중</div> : <div ref={ref} className="observer" />}
      {/* <div ref={ref} className="observer" /> */}
    </div>
  );
}

export default CommunityPhotoList;