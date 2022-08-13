/* global kakao */

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
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAAq5JREFUeJztXN2ZwiAQxHxXmzaiDWgdZwN3jZzNeU/4IfKzCwsDWeZNJWRnGAiBxYPpiOP1/KSUe9x/D61jsWh2IypZKlqJIl6pNHEf0kKIVNaadAwSYlRVgCLuo0aI4gtLyP99/5DKnW4XdjylIrAv4hD3CVOJlV5nDF8IVmEKeTf4kpaUqJMjArlgjrwNUop07X2oIpAKpcj3Il5yX4oI2QI58r2Jc2PIiZD8MUYe1eox5OJJiRD9IUV+FOI+UrHFRAh+OSN5C64Im0TFI+F0u5AnXMYEHBBq/VnIu4jF7Lvg7cNeyFtQRCB3gb3ipcTeWt8i54Kv0kqNqZ8H1Lz0xOrj1hHtArO1fmzkzz0VNmP47/ZWGM7jZjRYzkEHzNr6sZhTLih+CtS6wA0a6ahtlHW9UtQMyMfr+fnhAI79ZxoLYt2A/BjMkaztCtL1WOQaU/1MkOyAlJIl/dC/hluH1GRMxAHcsSAUPGo8mbILSC7JiQkw0xPBxXQOkF6QFRVgRhd8CMBdU+uJmtaPTfA26YSDmVzwuP8euo8BqVZMiddqMyYoQG03GM0FqfebzZi+WVklaNH6lnO0C+zFBbm32+HnAa03Yl8ChLrB7C4YbmOE0pquaD224d8E2JMLqHuDHw5oIUINJGd9VdvjNSL0XGLnLumvDJFUhapzhCxUZ4lZqM4TtFCdKWqhOlfYQnW2uAu15wVcjLKzDDkx4kLtmaEQVJ4aC0HtucEYuIL0WqccfkmsNZYA6ADQWAKgA0BjCYAOAI0lADoANJYA6ADQWAKgA0BjCYAOAI0lADoANNQL0DU9bsQ/U1PvgCUAOgA0lgDoANBYAqADQKN7mnxuLtA7dV+9A5YA6ADQUC8A5KxQbCBEnF1aDkDd2HcB6uSaegdAcbyen6PkGqrFP6dE1Qbm0FMiAAAAAElFTkSuQmCC",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAAshJREFUeJztnN11wjAMhRVOZ4NFYAGYoyzQLlKWo0/uSRPLlmzZ12B9T/wYR/daUZzEYaGOHK/np6Td4/69tI4l0GxDUrFSWpli3qm18C3WRph01lo0h4UZVR2ghG+pMaL4hyXifz6/RO1Ot4s6nlIT1D/SCN8Klgor/R2R3ghVY4n4dfAlI2nRp8YEccOc+BCkleja7UhNEDVKie8lvGS7EhOyDXLiewvXxpAzIfklJx416hy5eFImsF+kxI8ifEsqNs6E6IevKD6gNeFg0fFInG4X8YSLKJIBsdF/FfFruJi3WfDvzbuID0hMEO8C78qfE6OOfu0JVC4Lps+AD+6LkUa/Jo5wVOD6OBCNc2GjJ0FzNAM4xzTH15FIZQG7C6Q6C8Q6TZmXa8u1aclBk/6SWZZ2JobkeD0/d0cBTfHTiC0xxrIQc9tX7wKBdWexjjmx289z71tTVANy+25pHeBet6TJRKi0DiDqx/QzwSIDtiMlHTlpu56z0OIiSFRe0NCFb02xAaXFUFIIezJkDeh5ErYzwLISjzQr5OrKQrQ/G9QUIWuBrUY/pulx/16qimDAqg4giNaAmtQdKe0D2QsiNSsscoK1J0y9CJpNLopaFk1rchdFzWvAq+E3Rqw3qNkdtO1bYHZvULuwqWYhlATpvcFdBsSOCCMe2lJIxRMpdgHJ4S722qq9FG3N8hUiqQ6nXiMUmHqVWGDqdYKBqVeKBqZeKxyYerX4mmmfF1gzysIKyBMja6Z9ZijGlE+NxZj2uUEOrSG9nh4d8s5QT9wAdABo3AB0AGjcAHQAaNwAdABo3AB0AGjcAHQAaNwAdABo3AB0AGimN6DbJTGiMf9MbfoMcAPQAaBxA9ABoHED0AGg6ToPIMrPBXrOAYg8A9wANwAdAJruRZCIL4S9CyCRZwAmA4j2WYAYfSLPACzH6/k5ylrDafkFuBcUQ8II4rMAAAAASUVORK5CYII=",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAAm1JREFUeJztnNF1wyAMRbFPZ0sWSRZI5mgWaBZplku/1MNxEEgY87Cl+9XGGOs9ZGJT0Sl05HS7vCXtXo/ntHUsxGYXkoqVspUpzTttLXxJayOadLa1aI4WZqzqACV8yRojqk+sEf/7/SNqd75f1fHUmqA+SSN8KVgqrPa8EPRGqBpLxMfB14xkiz41JogblsRTkK1Er72O1ARRo5z4XsJrrisxodigJL63cG0MJROyBznxqFHnKMWTM4E9kBM/ivAludg4E5If7lE8oTXhq0XHWnIPRGuvcb5fVbHOyw9So7+HkY8hE5aktM2lBnsTT0hN+MgAa/wbcKTRJyRZ4BnAHdj76BNcFhBzCOMsbPSENCcz4CijT+SywOcAi+lPnG6X90cGHC39Ce42EL8LxEgXNxF9awfP5wB0AGjcAHQAaNwAdABoqr4G1z4nbLkkpuUjA0pvT3uFe8Cbe5ajjMbr8ZzMzwFJA452G+Teb+YQ+lZljQJpZm+Bo2RB6e3W5wD6IXUb7D0LuNGPtXoGxL8cKQskox9CIgOOYIJUfAiKW2AvJmjXNJMGcM8Fo5tQUyHCvg2+Hs8ptWQemzDK6vEmNUKE6SoxwnSdIGG6UpQwXStMmK4WjzG7XyBmlL8sQ3aMxJjdM5TC5K6xFGb3DXJoDem1TukLIugA0LgB6ADQuAHoANC4AegA0LgB6ADQuAHoANC4AegA0LgB6ADQuAHoANB0LY8b8Z+pmc8ANwAdABo3AB0AGjcAHQCa7mXypWeB3qX75jPADUAHgMa8AZC9QtxEiNi75BmAuvAyC1A718xnAJTT7fIepdbQLH/wuWzaX8nADQAAAABJRU5ErkJggg==",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAAphJREFUeJztnF1ywjAMhAXTs8FF4AJwjnKB9iLlcvSho44J/pNjaxWsb6YPLYmtXctxSOTuSJHD5fSoOe5++96NjoUZ1lGt2FpGmdK90d7Cl/Q2oktjo0Wn6GHGqgZQwpesMaL5xBbxP59fVccdr2dxPK0miE+SCF8KrhXWeh6R3AjRwTXiw+BbRrJHmxITqg8siecge4le20+tCVUH5cRrCW/pt8aE4gEl8drCpTGUTMh+mBKPGvUUpXhyJiQ/yIm3InxJLraUCdE/blE8IzVh36NhSxyv5+obLqJIBsRGfyviQ1IxL7Pg6Zd3Ec/UmFA9BbaCJP2JggywPvoSYWHMpSz40AgohsTYtX3lSE4BK6Pfw+hcG3siOw82lowcedYcnQKS0UemsiTGlCazq8DI0Q/ZW01/DQ6X0+MlA6xc/Ij+Upd/erQVyyqzU0ALNwDVsdZFrkTznSAzUghfjyB3gmj4wjc6U6AGrBHXa6VaPQVa4dROmRAufyOXZpgBROlRzBnTmxcDcvfNWozoO/ldQLMcxRr32/fO7CqgRdSA0WuvNrkpvSfSrcqyAmtOToF3yYLSBV20DPY0ZE0VSE/+MyA2DbaeBVO+GJHyZMA7ZUHTu0HG+luiErXiiQRTYCuZIB0orxDJNTh1jRAzdZUYM3WdIDN1pSgzda0wM3W1eMi0+wVCrLxZhuwYCZl2z1CMKXeNxZh232AKqSFazyn9gQg6ADRuADoANG4AOgA0bgA6ADRuADoANG4AOgA0bgA6ADRuADoANG4AOgA0quVxFv+Z2vQZ4AagA0DjBqADQOMGoANAo14mX7oX0C7dnz4D3AB0AGimNwCyVyh1IUTsXfIMQHW8zALUzrXpMwDK4XJ6WKk1nJZf6OeZQ7yfcQsAAAAASUVORK5CYII=",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAApRJREFUeJztnFGWgyAMReOcrs1uxG7ArmO6gelGpptzvuhxLIEEkQeS+zdTxLyXSBGxAxVknKdF0u71eA5Hx+I47ERSsVKOMiV7p7mFb8ltRJbOjhbNkcOMXR2ghG/ZY0TygSnif79/RO2u95s6nlQT1AdphG8FS4WlHkekN0LVWCJ+HXxKJnP0qTFB3DAm3gWZS/Te80hNEDUKiS8lPOW8EhOiDWLiSwvXxhAzIfghJx6VdY5YPCET2A9C4msRviUUG2eC958tindoTfjK0XFNXO838YSLyFMBvuy3In4NF/O2Cv79cRbxDokJlz2dI8idjPcYcLbsE/HjwVqreBA8K+wl0Er2Q5fi9X57VwGn5UJUz8KGltAMMDZGjfO0vB7PwVsBNWc/5XY7VAVNjgGutGNIvqm+Wit/TdZjjPO0fFRAzeW/B+4rsclLICdmADoANGYAOgA0ZgA6ADSnNUC6XvFhgHZNrWbWEzr2XiD1qSpitpj7nOzdYI2kPlmO4TUgtoiAQHPvv20TXRB5PZ5D7XeFLilchrXJcpf++/pPXRQtNWCmVmNsaXz312CJy+TIc2R7MJK7EnKIPvTByBbfwJOrryOxZ4O+g1s3QSqeSDEItjJF1ibKdoiEOux6j5Cj611ijq73CTq63inq6HqvsKPr3eJrun1fYE0tawiQN0bWdPvOkI8u3xrz0e17gxxaQ0q9PXraJ0NSzAB0AGjMAHQAaMwAdABozAB0AGjMAHQAaMwAdABozAB0AGjMAHQAaLo3oNiSGFGdP6bWfQWYAegA0JgB6ADQmAHoANAUnQcQxecCJecARFYBZoAZgA4ATfFBkIgfCEsPgERWAZgKIPqsAkT2iawCsIzztNSy17Bb/gBfuJ1ZEWAtHAAAAABJRU5ErkJggg==",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAAAAXNSR0IArs4c6QAAAp9JREFUeJztXF16gyAQRL+czVzEXMCco7lAc5HmcuaJfpbys4sLo9mdpzRRmBkGRYQOriOmZV4px70ez6E1F49mFVHFUtHKFPFCpYWHkDZCpLDWolOQMGNXASjhIfYYUX1ijfifr2/Scdf7jc2n1gT2SRzhoWCqsNrznOMbwTqYIn5LvqYlJcrkmEA+sCTek5QSvbceqgmkg3LiewmvqZdiQvGAkvjewrkcSiZkf0yJR7V6CiU+OROSP+TEH0V4iBy3lAnRL88o3oNrwihR8JFwvd/IAy7nIgmItX5MPKeSlkg1SqrBwhT8SQBV/BmQSkKo8SJVWQ6ctHAjvBe/Buxp/RxhZHq8mSGHaZlX3xXIF8EeQJiVNKB33/d1Sce/1KVG59pNbHAN3PMYzIXXHE2AROtzWrR10nIpaHINqBGPGleM0vFvJf56v4knZVrmdQgNqL311Ux37b1GcMuIaRMZCPnCpc/pMSg61DgAATMATQCNZgZIXLV73BotAWgCaJgB4Rc1995Sf28xiuMiNcC7vB7Pf6NBBLbkej0XvB7PAdIFOIlonZ6oAb3n5Voj93wzOtd3VdZRUJwT/JQUlJ5u7TboP8S6wdlTQHk7ZAnY/vFJKaC+GyS/Hj/TO0KqeOcYXeAsSeA2lK0QyRWoeo2Qh+pVYh6q1wl6qF4p6qF6rbCH6tXiW6jdL7DFEabSnAPtGNlC7Z6hGFTuGotB7b7BFLiG9JqntAkRNAE0zAA0ATTMADQBNMwANAE0zAA0ATTMADQBNMwANAE0zAA0ATTMADQBNLoujzviP1NTnwAzAE0ADTMATQANMwBNAI3uy+RLY4HeS/fVJ8AMQBNAQ70BkL1CqQshYu+SJQBVcZgC1M419QmAYlrm9ShrDdXiDdEjqpakOi/HAAAAAElFTkSuQmCC",
    ]

    const imageSize = new kakao.maps.Size(80, 60);
    const imageOptions = {  
        spriteOrigin: new kakao.maps.Point(-25, 0),    
        spriteSize: new kakao.maps.Size(30, 50)  
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
          const content = `<div style="background-color:#467264;"><div style="color:white;margin:10px;">${data[idx].place_name}</div></div>`;
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
