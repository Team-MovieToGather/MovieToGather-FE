<script setup>
// example components
import Header from "../../../examples/Header.vue";


// image
import image from "@/assets/img/city-profile.jpg";
import DefaultInfoCard from "@/examples/cards/infoCards/DefaultInfoCard.vue";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import MeetingInfo from "@/views/LandingPages/Community/Sections/MeetingInfo.vue";
</script>
<template>
  <NavbarNoDropdown transparent />
  <Header>
    <div
      class="page-header min-height-400"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="container mydiv mt-5">
    <div class="container mt-5">
      <MeetingInfo address="www.naver.com" :is-offline="false" />
    </div>
    <div class="container mt-5">
      <div class="container row">
        <div class="col-6">
          <img class="mysize"
            src="https://i.namu.wiki/i/mREUnCFVkCakteF2HcHHBIRdyOXls-AHbWkAG7AuHsyqr80WjV7jHUrnmoN3JPaQrLNJLnZjq4oaicSQKoPsPR-wKEBWeycMTA3Qeq8_an5P3q-Z-dcuf0yRWEeEdHJ_Mvpm9heCwScnHKzNQn9TKhVdB1joitx-sdGGeSKHEas.webp"
          />
        </div>
        <div class="col-6">
          <DefaultInfoCard title="영화제목" description="장르 : 액션" />
        </div>
      </div>
    </div>
  </div>
  <div class="container text-md-end mt-5 mydiv">
    <div class="q-pa-md q-gutter-sm">
      <RouterLink
        :to="{ name: 'update-review' }">
        <q-btn color="deep-orange" glossy label="모임 수정하기" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'update-review' }">
      <q-btn color="purple" label="모임 삭제하기" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'chatroom' }">
      <q-btn color="black" label="채팅방 입장" />
      </RouterLink>
    </div>

  </div>
  <div class="container mt-5 mydiv">
    <div id="map">
      <KakaoMap />
    </div>
  </div>
</template>
<script>
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";

export default {
  name: "DetailCommunityView",
  components: {
    KakaoMap,
  },
};
</script>
<style scoped>
.mysize {
  width: 60px;
  height: 90px;
}

.mydiv {
  border: 1px solid black;
}

</style>