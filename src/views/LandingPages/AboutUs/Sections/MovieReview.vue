<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { getReviewHeart } from "@/api";

const props = defineProps({
  reviewId: Number,
  movieImg: String,
  postingTitle: String,
  heart: Number,
  movieTitle: String,
  genre: String,
  contents: String,
  createdAt: String,
  name: String
});

const heartCount = ref(props.heart);

onMounted(() => {
  console.log("좋아요에 필요한 id: ", props.reviewId);
});

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false // 24시간 형식 사용
  };
  // 'T'와 초 정보를 제거
  return new Date(dateString).toLocaleString("ko-KR", options)
    .replace(/(\.\d+)?$/, "");
}


const toggleHeart = async () => {
  try {
    const response = getReviewHeart(props.reviewId);
    heartCount.value = response.data.heart;
    console.log('좋아요 성공 id: ', props.reviewId);
  } catch (error) {
    console.error('좋아요 실패 id: ', props.reviewId, error);
  }
};

</script>


<template>
  <div class="q-px-lg q-py-md">
    <div class="row">
      <h2 class="col-6 text-h4">{{ postingTitle }}</h2>
      <p class = "col-6 text-md-end">
        <q-btn @click="toggleHeart" flat round color="red" icon="favorite" />{{ heartCount }}</p>
    </div>
    <div class ="row">
      <p class="col-6">Written By {{ name }}</p>
      <p class = "col-6 text-md-end">{{ formatDate(createdAt) }}</p>
    </div>
    <div>
      <p class="col-6">{{ contents }}</p>
    </div>
  </div>
</template>

<style>
.mydiv {
  border: 1px solid black;
}
</style>