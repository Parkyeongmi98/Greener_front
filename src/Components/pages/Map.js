import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import "./css/Map.css"

const { kakao } = window;

const Map = () => {
    const [map, setMap] = useState(null);

    //처음 지도 그리기
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(37.485487614505, 126.930991078) };
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);

    },[])

    function locationLoadSuccess(pos){
        // 현재 위치 받아오기
        var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
    
        // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
        map.panTo(currentPos);
    
        // 마커 생성
        var marker = new kakao.maps.Marker({
            position: currentPos
        });
    
        // 기존에 마커가 있다면 제거
        marker.setMap(null);
        marker.setMap(map);
    };
    
    function locationLoadError(pos){
        alert('위치 정보를 가져오는데 실패했습니다.');
    };
    
    // 위치 가져오기 버튼 클릭시
    function getCurrentPosBtn(){
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
    };

    // 키워드 검색
    function keywordSearch(currentPos){
        var keyword = document.getElementById('keyword').value;

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        var markers = [];
    
        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(map);

        var places = new kakao.maps.LatLng();
        // 검색 옵션 객체
        var searchOption = {
            location: places,
            radius: 1000,
            size: 5
        };
    
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword,placesSearchCB,searchOption);
    
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
    
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlacesOnSidebar(data);
    
                // 페이지 번호를 표출합니다
                displayPagination(pagination);
    
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    
                alert('검색 결과가 존재하지 않습니다.');
                return;
    
            } else if (status === kakao.maps.services.Status.ERROR) {
    
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
    
            }
        }
    
        // 사이드바에 결과 출력 + 마커 생성
        function displayPlacesOnSidebar(places) {
    
            var listEl = document.getElementById('placeslist'),
                menuEl = document.getElementsByClassName('result-list'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';
    
            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);
    
            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
    
            for ( var i=0; i<places.length; i++ ) {
    
                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
    
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);
    
                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function(marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });
    
                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infowindow.close();
                    });
    
                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, title);
                    };
    
                    itemEl.onmouseout =  function () {
                        infowindow.close();
                    };
                })(marker, places[i].place_name);
    
                fragment.appendChild(itemEl);
            }
    
            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
    
    
    // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {
    
            var el = document.createElement('li'),
                itemStr = '<span className="markerbg marker_' + (index+1) + '"></span>' +
                    '<div className="info">' +
                    '   <h5>' + places.place_name + '</h5>';
    
            itemStr += '  <span className="tel">' + places.phone  + '</span>' +
                '</div>' + '<br/>' + '<hr/>';
    
            el.innerHTML = itemStr;
            el.className = 'item';
    
            return el;
        }
    
        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage
                });
    
            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다
    
            return marker;
        }
    
        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }
            markers = [];
        }
    
        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;
    
            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild (paginationEl.lastChild);
            }
    
            for (i=1; i<=pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;
    
                if (i===pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }
    
                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
    
        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style={{padding:"5px",z-index:"1"}}>' + title + '</div>';
    
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    
        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }
    }

    return (
        <div>
            <div style={{display: "flex"}}>
            <h1 style={{marginLeft: "4%", marginTop: "2%", color: "#454545", fontSize: "50px"}}>수목원 검색 <i class="fa-solid fa-magnifying-glass" style={{fontSize : "50px"}}></i></h1>
            <Button variant="outline-secondary" onClick={getCurrentPosBtn} style={{width: "250px", height: "60px", marginLeft: "55%", marginTop: "3%"}}>내 위치 가져오기</Button>
            </div>
            <div className='map_wrap'>
                <div id="map" style={{width:"95%",height:"100%",position:"relative",overflow:"hidden", marginTop: "2%", marginLeft: "2%", marginRight: "2%"}}></div>

                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                    <div>
                        <div id="form" style={{marginTop: "4%"}}>
                            <input
                            type="text"
                            id="keyword"
                            placeholder='키워드를 입력하세요'
                            />
                            <button id="submit_btn" type="submit" onClick={keywordSearch}>
                            검색
                            </button>
                        </div><br/>
                    </div>
                    </div>
                    <hr/>
                    <ul id="placeslist"></ul>
                    <div id="pagination"></div>
                </div>

            </div>
        </div>

    );
};

export default Map;
