import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import Loading from "@components/common/Loading";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoList } from "../../store/photo";
import CommunityPhotoCard from "./CommunityPhotoCard";
import { getPhoto } from "../../apis/photo";

function CommunityPhotoList() {
  // const [photoList, setPhotoList] = useState([]); // 불러온 데이터 저장
  const photoList = useSelector(state => state.photo.photoList);

  const [page, setPage] = useState(0); // 현재페이지
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const isEnd = useSelector(state => state.photo.isEnd);
  // async function getPhotoList() {
  //   console.log(11111)
  //   const res = await getPhoto(page);
  //   console.log(22222)
  //   useDispatch(setPhotoList({photoList:res}))
  //   setLoading(false);
  // }

  const getPhotoList = async () => {
    console.log(11111);
    const res = await getPhoto(page);
    console.log(22222);
    dispatch(setPhotoList({ photoList: res }));
    setLoading(false);
  };

  useEffect(() => {
    if (!!inView && !loading) {
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
      {!isEnd && loading ? (
        <Loading />
      ) : (
        <div ref={ref} className="observer">
          여기
        </div>
      )}
      {isEnd && (
        <div ref={ref} className="observer">
          end
        </div>
      )}
      {/* <div ref={ref} className="observer" /> */}
    </div>
  );
}

export default CommunityPhotoList;
