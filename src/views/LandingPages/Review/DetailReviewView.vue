<script setup>
// example components
import Header from "../../../examples/Header.vue";
// image
import MovieReview from "@/views/LandingPages/AboutUs/Sections/MovieReview.vue";
import Comments from "@/views/LandingPages/AboutUs/Sections/Comments.vue";
import DefaultInfoCard from "@/examples/cards/infoCards/DefaultInfoCard.vue";


import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import bg0 from "@/assets/img/bg9.jpg";
import Typed from "typed.js";
import { deleteReview } from "@/api";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

const route = useRoute();

const id = ref(0);
const movieImg = ref("");
const postingTitle = ref("");
const heart = ref(0);
const movieTitle = ref("");
const genre = ref("");
const contents = ref("");
const createdAt = ref(0);
const name = ref("");

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

const body = document.getElementsByTagName("body")[0];


onMounted(() => {
  id.value = Number(route.query.id);
  movieImg.value = route.query.movieImg;
  postingTitle.value = route.query.postingTitle;
  heart.value = route.query.heart;
  movieTitle.value = route.query.movieTitle;
  genre.value = route.query.genre;
  contents.value = route.query.contents;
  createdAt.value = route.query.createdAt;
  name.value = route.query.name;
  console.log("지금 보고 있는 리뷰 id: ", id.value);

  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});

// 삭제 로직
async function deleteReviewFunction() {
  const isConfirmed = window.confirm("정말로 리뷰를 삭제하시겠습니까?");
  if (isConfirmed) {
    try {
      // deleteReview.fetch(id.value);
      await deleteReview(id.value);
      console.log("리뷰 삭제 성공  id: ", id.value);
      await router.push({ name: "review" }); // 리뷰 목록으로 리다이렉트
    } catch (error) {
      console.error("리뷰 삭제 실패", error);
    }
  }
}



</script>
<template>

  <NavbarLoggedIn transparent />

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
              영화를 함께 <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>보고</h1>
              <h1>즐기고</h1>
              <h1>이야기하고</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8">
              여러분의 영화 경험을 나누어보세요
            </p>
            <button type="submit" class="btn bg-white text-dark">
              <RouterLink
                :to="{ name: 'search-movie' }">리뷰 작성하러 가기
              </RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>


  <div class="container mydiv mt-5">
    <div class="container mt-5">
      <MovieReview
        :reviewId="route.query.id"
        :movieImg="movieImg"
        :postingTitle="postingTitle"
        :heart="heart"
        :movieTitle="movieTitle"
        :genre="genre"
        :contents="contents"
        :createdAt="createdAt"
        :name="name"
      />
    </div>
    <div class="container mt-5">
      <div class="container row">
        <div class="col-6">
          <img class="mysize"
               :src="movieImg">
        </div>
        <div class="col-6">
          <DefaultInfoCard :title="movieTitle" :description="'장르: ' + genre" />
        </div>

      </div>
    </div>
  </div>

  <!--  댓글-->
  <div class="container mt-5 mydiv">
    <Comments :reviewId="route.query.id" />
  </div>


  <div class="container text-md-end mt-5 mydiv">
    <div class="q-pa-md q-gutter-sm">
      <RouterLink
        :to="{ name: 'update-review', query: {id: route.query.id, mode: 'edit'} }">
        <q-btn color="deep-orange" glossy label="리뷰 수정하기" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'review' }">
      <q-btn @click="deleteReviewFunction" color="purple" label="리뷰 삭제하기" />
      </RouterLink>

    </div>

  </div>
</template>


<style scoped>
.mysize {
  width: 60px;
  height: 90px;
}

.mydiv {
  border: 1px solid black;
}

</style>