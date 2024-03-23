<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep

//sections
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import ReviewForm from "@/views/LandingPages/CreateReview/Sections/ReviewForm.vue";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// const title = "리뷰 수정하기";
const route = useRoute();
const reviewId = ref(0);

onMounted(() => {
  reviewId.value = route.query.id;
  if (reviewId.value) {
    console.log("UpdateReview 수정할 리뷰 Id: ", reviewId.value); // 정상

  } else {
    console.log("UpdateReview 리뷰 id 를 못 받았습니다.")
  }
});

</script>
<script>
export default {
  data() {
    return {
      clicked: "영화제목",
    };
  },
  methods: {
    clickedItem(item) {
      this.clicked = item;
    },
  },
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
              리뷰 수정하기
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
    <ReviewForm :mode="'edit'" :reviewId="reviewId" />
  </div>

</template>
