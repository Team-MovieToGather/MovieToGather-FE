<script setup>
import MeetingInfo from "@/views/LandingPages/Community/Sections/MeetingInfo.vue";
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import CommunityDeleteModal from "@/views/LandingPages/Community/components/CommunityDeleteModal.vue";
import NavbarNoLogin from "@/examples/navbars/NavbarNoLogin.vue";
import { useRoute } from "vue-router";

// Function to extract meeting ID from URL
const extractMeetingIdFromUrl = () => {
  const route = useRoute();
  const parts = route.path.split('/');
  return parts[parts.length - 1];
};

// 이 화면에서 사용하는 모임의 ID를 정의합니다.
const meetingId = extractMeetingIdFromUrl();
</script>

<template>
  <NavbarNoLogin transparent />
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
    <div class="row">
      <div class="col-3 mt-4">
        <img class="mysize"
             src="https://i.namu.wiki/i/mREUnCFVkCakteF2HcHHBIRdyOXls-AHbWkAG7AuHsyqr80WjV7jHUrnmoN3JPaQrLNJLnZjq4oaicSQKoPsPR-wKEBWeycMTA3Qeq8_an5P3q-Z-dcuf0yRWEeEdHJ_Mvpm9heCwScnHKzNQn9TKhVdB1joitx-sdGGeSKHEas.webp"
        />
      </div>
      <div class="col-9 mt-5">
        <MeetingInfo address="naver" is-offline="OFFLINE"/>
      </div>
    </div>
  </div>

  <div class="container mt-5 mydiv">
    <KakaoMap />
  </div>
  <div class="container text-md-end mt-5 mydiv ">
    <div class="row q-pa-md q-gutter-sm">
      <CommunityDeleteModal :meeting-id="meetingId" />
    </div>
  </div>
  <FooterDefault />
</template>
<style scoped>
.mysize {
  width: 200px;
  height: 300px;
}

.mydiv {
  border: 1px solid black;
}

</style>
