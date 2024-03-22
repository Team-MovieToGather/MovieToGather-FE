<script setup>
// example components
import Header from "../../../examples/Header.vue";
// image
import MovieReview from "@/views/LandingPages/AboutUs/Sections/MovieReview.vue";
import Comments from "@/views/LandingPages/AboutUs/Sections/Comments.vue";
import DefaultInfoCard from "@/examples/cards/infoCards/DefaultInfoCard.vue";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const id = ref(0)
const movieImg = ref('');
const postingTitle = ref('');
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
  }})

onMounted(() => {
  id.value = route.query.id;
  movieImg.value = route.query.movieImg;
  postingTitle.value = route.query.postingTitle;
  heart.value = route.query.heart;
  movieTitle.value = route.query.movieTitle;
  genre.value = route.query.genre;
  contents.value = route.query.contents;
  createdAt.value = route.query.createdAt;
  name.value = route.query.name;
  console.log("지금 보고 있는 리뷰 id: ", id);

});


// const reviewData = {
//   id: route.query.id,
//   movieImg:  route.query.movieImg,
//   postingTitle:  route.query.postingTitle,
//   heart: route.query.heart,
//   movieTitle:  route.query.movieTitle,
//   genre: route.query.genre,
//   contents: route.query.contents,
//   name: route.query.name
// }

function goToUpdateReview() {
  router.push({
    name: 'update-review',
    query: {
      id: id.value,
      mode: 'edit'
    }
  });
  console.log("수정하기로 넘어갑니다 id: ", id.value) // 정상
}


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
      <MovieReview
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
    <Comments />
  </div>


  <div class="container text-md-end mt-5 mydiv">
    <div class="q-pa-md q-gutter-sm">
      <RouterLink
        :to="{ name: 'update-review' }">
        <q-btn @click="goToUpdateReview" color="deep-orange" glossy label="리뷰 수정하기" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'update-review' }">
      <q-btn color="purple" label="리뷰 삭제하기" />
      </RouterLink>
      <RouterLink
        :to="{ name: 'update-review' }">
      <q-btn color="black" label="리뷰 공유하기" />
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