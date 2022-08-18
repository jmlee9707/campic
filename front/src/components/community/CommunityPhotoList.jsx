import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import Loading from "@components/common/Loading";
import { useInView } from "react-intersection-observer";
import LastList from "@components/common/LastList";
import CommunityPhotoCard from "./CommunityPhotoCard";

import { getPhoto } from "../../apis/photo";

function CommunityPhotoList() {
  const [photoList, setPhotoList] = useState([]); // 불러온 데이터 저장

  const [page, setPage] = useState(0); // 현재페이지
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [last, setLast] = useState(false);

  async function getPhotoList() {
    const res = await getPhoto(page);
    setPhotoList([...photoList, ...res]);
    setLoading(false);
    if (res.length >= 0 && res.length < 15) {
      setLast(true);
    }
  }
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setPage(page + 1);
      getPhotoList();
    }
  }, [inView, loading]);
  // console.log(ref);

  return (
    <div className="commu_photo_list flex">
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
      {!last && loading ? <Loading /> : <div ref={ref} className="observer" />}
      {last && <LastList />}
    </div>
  );
}

export default CommunityPhotoList;
