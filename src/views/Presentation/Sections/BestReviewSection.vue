<script setup>
import BestReviewCard from "@/views/Presentation/Components/BestReviewCard.vue";
import DefaultTitle from "@/views/Presentation/Components/DefaultTitle.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

const bestReviews = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/reviews/bestTop3');
    bestReviews.value = response.data;
    console.log('1등 : ', response.data[0]);
  } catch (error) {
    console.error('베스트 리뷰 조회 실패', error);
  }
})

function goToDetailReview(review) {
  router.push({
    name: 'detail-review-view',
    query: {
      id: review.id,
      movieImg: review.movieImg,
      postingTitle: review.postingTitle,
      heart: review.heart,
      movieTitle: review.movieTitle,
      genre: review.genre,
      contents: review.contents,
      createdAt: review.createdAt,
      name: review.name
    }  })
}


</script>
<template>
  <section>
    <div class="container q-pa-md">
      <div class="row">
        <DefaultTitle title="Best Review 3"></DefaultTitle>
        <div class="col-lg-4" v-for="review in bestReviews" :key="review.id">
          <BestReviewCard
            :image="review.movieImg"
            name="재영"
            :title="review.postingTitle"
            @click="goToDetailReview(review)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
