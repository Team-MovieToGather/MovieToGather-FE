<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

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
  console.log('좋아요에 필요한 id: ',props.reviewId)
})
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 24시간 형식 사용
  };
  // 'T'와 초 정보를 제거
  return new Date(dateString).toLocaleString('ko-KR', options)
    .replace(/(\.\d+)?$/, '');
}

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDE0NTEyNDEyNjgxMjIyOTUzNjIiLCJpc3MiOiJ0ZWFtLnNwYXJ0YS5jb20iLCJpYXQiOjE3MTExNjk2MDAsImV4cCI6MTcxMTE3MzIwMCwiZW1haWwiOiJ0cmFuZ25hbW8xMTE3QGdtYWlsLmNvbSIsIm9hdXRoVHlwZSI6IkdPT0dMRSJ9.Wu60R-yGH_iA8WZuqz_NW15FLc-Sdug8TrjtW50CWAI';

const toggleHeart = async () => {
  try {
    const response = await axios.post(`http://localhost:8080/api/reviews/${props.reviewId}/heart`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    heartCount.value = response.data.heart;
  } catch (error) {
    console.error('좋아요 실패 id: ', props.reviewId. error);
  }
}

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