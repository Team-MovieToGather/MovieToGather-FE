<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//sections
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import UpdateCommunityForm from "@/views/LandingPages/Community/Sections/UpdateCommunityForm.vue";

const title = "모임 정보 수정하기";

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
  }
};
</script>
<template>
  <NavbarNoDropdown
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
    <UpdateCommunityForm />
  </div>

</template>
