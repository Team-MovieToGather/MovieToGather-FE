<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
//sections

import ReviewForm from "@/views/LandingPages/CreateReview/Sections/ReviewForm.vue";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

const title = "리뷰 작성하기";

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
              리뷰 작성하기
            </h1>

            <p class="lead mb-4 text-white opacity-8">
              여러분의 영화 경험을 나누어보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <ReviewForm :title="title" />
  </div>

</template>
