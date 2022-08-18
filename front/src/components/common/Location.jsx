/* global kakao */
import BK from "@assets/images/marker/BK9.png";
import MT from "@assets/images/marker/MT1.png";
import PM from "@assets/images/marker/PM9.png";
import OL from "@assets/images/marker/OL7.png";
import CE from "@assets/images/marker/CE7.png";
import CS from "@assets/images/marker/CS2.png";
import React, { useEffect } from "react";
// const { kakao } = window;

function Location({pos}) {


  // 지도 초기 설정
  const options = {
    center: new kakao.maps.LatLng(pos.mapX, pos.mapY),
    level: 5
  };

  // 마커 위치 정하기
  const markerPosition = new kakao.maps.LatLng(
    pos.mapX,
    pos.mapY
  );

  // 마커 생성
  const marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  const zoomControl = new kakao.maps.ZoomControl();

  // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
  const mapTypeControl = new kakao.maps.MapTypeControl();


//   function makeOverListener(map, mark, infowindow) {
//     return function() {
//         infowindow.open(map, mark);
//     };
// };

// function makeOutListener(infowindow) {
//   return function() {
//       infowindow.close();
//   };
// };
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
    // 은행, 마트, 약국, 주유소, 카페, 편의점
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

    // 지도 담을 컨테이너 생성
    const container = document.getElementById("map");

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const map = new kakao.maps.Map(container, options);

    // 장소 검색용 객체 생성
    const ps = new kakao.maps.services.Places(map);
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    // eslint-disable-next-line no-unused-vars
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        let markPos = {};
        let mark = {};
        console.log("정보", data);
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
          // kakao.maps.event.addListener(mark, 'mouseover', makeOverListener(map, mark, infowindow));
          // kakao.maps.event.addListener(mark, 'mouseout', makeOutListener(infowindow));
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


    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    

    // 마커 맵에 넣기
    marker.setMap(map);
  }, []);


//   for ( var i=0; i<places.length; i++ ) {

//           // 마커를 생성하고 지도에 표시합니다
//           var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

//           // 마커와 검색결과 항목을 클릭 했을 때
//           // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
//           (function(marker, place) {
//               kakao.maps.event.addListener(marker, 'click', function() {
//                   displayPlaceInfo(place);
//               });
//           })(marker, places[i]);
//   }
// }



  return( 
    <div>
      <div id="map" />
    </div>
    );
}

export default Location;
