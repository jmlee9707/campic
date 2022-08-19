/* global kakao */
import BK from "@assets/images/marker/BK9.png";
import MT from "@assets/images/marker/MT1.png";
import PM from "@assets/images/marker/PM9.png";
import OL from "@assets/images/marker/OL7.png";
import CE from "@assets/images/marker/CE7.png";
import CS from "@assets/images/marker/CS2.png";
import React, { useEffect } from "react";

function Location({pos}) {

  const options = {
    center: new kakao.maps.LatLng(pos.mapX, pos.mapY),
    level: 5
  };

  const markerPosition = new kakao.maps.LatLng(
    pos.mapX,
    pos.mapY
  );

  const marker = new kakao.maps.Marker({
    position: markerPosition
  });

  const zoomControl = new kakao.maps.ZoomControl();

  const mapTypeControl = new kakao.maps.MapTypeControl();

  function makeOverListener(map, overlay) {
    return function() {
      overlay.setMap(map);
    };
};
function makeOutListener (overlay) {
  return function() {
      overlay.setMap(null);
  };
};   

  useEffect(() => {
    const searchList = ["BK9", "MT1", "PM9", "OL7", "CE7", "CS2"]
    // eslint-disable-next-line no-unused-vars
    const markerImg = [
      BK,
      MT,
      PM,
      OL,
      CE,
      CS,
    ]

    const imageSize = new kakao.maps.Size(34, 48);
    const imageOptions = {  
        spriteOrigin: new kakao.maps.Point(0, 0),    
        // spriteSize: new kakao.maps.Size(30, 50)  
    };   

    const container = document.getElementById("map");
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places(map);
    // eslint-disable-next-line no-unused-vars
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let markPos = {};
        let mark = {};
        // eslint-disable-next-line no-plusplus
        for (let idx = 0; idx < data.length; ++idx) {
          const markerImage = new kakao.maps.MarkerImage(markerImg[searchList.indexOf(data[idx].category_group_code)], imageSize, imageOptions)
          markPos =  new kakao.maps.LatLng(
            data[idx].y,
            data[idx].x
          );

          mark = new kakao.maps.Marker({
            position: markPos,
            image: markerImage            
          });
          
          // 컨텐츠 생성
          const content = `<div style="background-color:#467264;"><div style="color:white;padding:10px;">${data[idx].place_name}</div></div>`;
          // const infowindow = new kakao.maps.InfoWindow({
          //   content: `<div style="position: absolute; left: 0px; top: 0px;"><div style="width:140px;padding:1px;text-align:center;">${data[idx].place_name}</div></div>` // 인포윈도우에 표시할 내용
          //   });
          const overlay = new kakao.maps.CustomOverlay({
            // eslint-disable-next-line object-shorthand
            content: content,
            // eslint-disable-next-line object-shorthand
            map: map,
            position: markPos  
        });
          overlay.setMap(null);
          kakao.maps.event.addListener(mark, 'click', makeOverListener(map, overlay));
          kakao.maps.event.addListener(mark, 'mouseout', makeOutListener(overlay));
          mark.setMap(map);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

      } else if (status === kakao.maps.services.Status.ERROR) {
          // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
          
      }
    };
    // eslint-disable-next-line no-plusplus
    for (let idx = 0; idx < searchList.length; ++idx) {
      ps.categorySearch(searchList[idx], placesSearchCB, {useMapBounds:true}); 
    }


    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    marker.setMap(map);
  }, []);

  return( 
    <div>
      <div id="map" />
    </div>
    );
}

export default Location;
