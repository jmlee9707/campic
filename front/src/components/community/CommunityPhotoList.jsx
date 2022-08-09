import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useInView } from "react-intersection-observer";
import CommunityPhotoCard from "./CommunityPhotoCard";
import "./CommunityPhotoCard.scss";
import { getPhoto } from "../../apis/photo";
// import { Link } from "react-router-dom";

function CommunityPhotoList() {
  const [photoList, setPhotoList] = useState([]); // 불러온 데이터 저장
  // 포토api 호출 무한정 담긴다 => 무한스크롤
  const [page, setPage] = useState(0); // 현재페이지
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetPhoto() {
      const res = await getPhoto(page);
      // console.log(res);
      console.log("11111");
      setPhotoList([...photoList, ...res]);
    }
    getAndSetPhoto();
    setLoading(false);
  }, [page]);
  console.log(photoList);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
    }
  }, [inView, loading]);

  return (
    <div className="maincomupiclist flex">
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
      {loading ? <div>로딩중</div> : <div ref={ref} className="observe" />}
    </div>
  );
}

export default CommunityPhotoList;
