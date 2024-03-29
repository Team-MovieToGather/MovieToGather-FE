<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//sections

import UpdateCommunityForm from "@/views/LandingPages/Community/Sections/UpdateCommunityForm.vue";
import { useRoute } from "vue-router";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

const title = "모임 정보 수정하기";
const extractMeetingIdFromUrl = () => {
  const route = useRoute();
  const parts = route.path.split('/');
  return parts[parts.length - 1];
};

// 이 화면에서 사용하는 모임의 ID를 정의합니다.
const meetingId = extractMeetingIdFromUrl();

</script>
<script>
export default {
  data() {
    return {
      clicked: "영화제목"
    };
  },
  methods: {
    clickedItem(item) {
      this.clicked = item;
    }
  },


};
</script>
<template>
  <NavbarLoggedIn
    :action="{
      route: 'basic',
      label: '로그인',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              모임 정보 수정하기
            </h1>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <UpdateCommunityForm :meeting-id="meetingId" />
  </div>

</template>
