<template>
  <!-- 지도를 표시할 div 입니다 -->
  <div id="map" style="width: 100%; height: 350px"></div>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1977c706ad34cbefe247fce2abc86814"></script>
<script>
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(127.034898308484, 37.4997200069753), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
  };
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
</script>
<style scoped>
</style>