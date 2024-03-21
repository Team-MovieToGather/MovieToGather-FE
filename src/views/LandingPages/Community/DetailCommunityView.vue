<script setup>
// example components
import Header from "../../../examples/Header.vue";
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";


// image
import image from "@/assets/img/city-profile.jpg";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import MeetingInfo from "@/views/LandingPages/Community/Sections/MeetingInfo.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import CommunityDeleteModal from "@/views/LandingPages/Community/components/CommunityDeleteModal.vue";

const online = "ONLINE";
const offline = "OFFLINE";
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
    <div class="row">
      <div class="col-3 mt-4">
        <img class="mysize"
             src="https://i.namu.wiki/i/mREUnCFVkCakteF2HcHHBIRdyOXls-AHbWkAG7AuHsyqr80WjV7jHUrnmoN3JPaQrLNJLnZjq4oaicSQKoPsPR-wKEBWeycMTA3Qeq8_an5P3q-Z-dcuf0yRWEeEdHJ_Mvpm9heCwScnHKzNQn9TKhVdB1joitx-sdGGeSKHEas.webp"
        />
      </div>
      <div class="col-9 mt-5">
        <MeetingInfo address="www.naver.com" :is-offline=online />
      </div>
    </div>
  </div>

  <div class="container mt-5 mydiv">
    <KakaoMap />
  </div>
  <div class="container text-md-end mt-5 mydiv ">
    <div class="row q-pa-md q-gutter-sm">
      <CommunityDeleteModal />
    </div>
  </div>
  <FooterDefault />
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      dialog: ref(false),
      cancelEnabled: ref(false)
    };
  },
  methods: {
    enterForm() {
      this.$router.push({ name: "update-review" });
    },
    enterChatroom() {
      this.$router.push({ name: "chatroom" });
    }
  }
};
</script>
<style scoped>
.mysize {
  width: 200px;
  height: 300px;
}

.mydiv {
  border: 1px solid black;
}

</style>