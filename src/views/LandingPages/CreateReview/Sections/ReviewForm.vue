<script setup>
import { onMounted } from 'vue';
import MaterialButton from "@/components/MaterialButton.vue";
import FormTitle from "@/views/LandingPages/CreateReview/Sections/FormTitle.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const movieTitle = ref(route.query.title);
const movieImg = ref(route.query.posterUrl);
const genreNames = ref(route.query.genreNames);

const props = defineProps({
  mode: {
    type: String,
    default: 'create'
  },
  reviewId: String,
});

const postingTitle = ref('');
const star = ref(0);
const contents = ref('');

// 수정 모드일 때 기존 리뷰 데이터를 불러옵니다.
onMounted(async () => {
  console.log("mode: ", props.mode)
  console.log("reviewId: ", props.reviewId)
  console.log("title: ", movieTitle)
});

const submitForm = async () => {
  try {
    let response;
    if (props.mode === 'edit') {
      // Update review
      response = await axios.put(`http://localhost:8080/api/reviews/${props.reviewId}`, {
        postingTitle: postingTitle.value,
        star: star.value,
        contents: contents.value,
      });
    } else {
      // Create new review
      response = await axios.post('http://localhost:8080/api/reviews', {
        movieTitle: movieTitle.value,
        movieImg: movieImg.value,
        genre: genreNames.value,
        postingTitle: postingTitle.value,
        star: star.value,
        contents: contents.value,
      });
    }
    console.log('리뷰가 저장되었습니다.', response.data);
  } catch (error) {
    console.error('리뷰 저장에 실패했습니다.', error);
  }
};
</script>

<template>
  <section>
    <div class="container py-4">
      <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
        <FormTitle :title="title" />
        <form role="form" id="contact-form" v-on:submit.prevent="submitForm">
          <div class="card-body">
            <h4>리뷰 제목</h4>
            <div class="mb-4">
              <q-input v-model="postingTitle" stack-label :dense="dense" />
            </div>
            <h4>별점</h4>
            <div class="mb-4">
              <q-input v-model="star" stack-label :dense="dense" />
            </div>
            <h4>리뷰 내용</h4>
            <div class="q-pa-md" style="max-width: 800px">
              <q-input
                v-model="contents"
                filled
                type="textarea"
              />
            </div>
            <div class="container">
              <div class="row justify-space-between text-center py-2">
                <div class="col-12 mx-auto">
                  <MaterialButton type="submit" variant="gradient" color="secondary" class="w-auto me-2">리뷰 저장하기
                  </MaterialButton>

                  <RouterLink :to="{ name: 'review' }">
                    <MaterialButton variant="gradient" color="primary" class="w-auto me-2">작성 취소하기</MaterialButton>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { ref } from 'vue'




// export default {
//   data: function() {
//     return {
//       postingTitle: ref(""),
//       star: ref(0),
//       contents: ref("")
//     };
//   },
//   methods: {
//     submitForm: function() {
//       console.log(title, posterUrl, genreNames)
//       console.log(this.postingTitle, this.star, this.contents);
//       var url = "http://localhost:8080/api/reviews";
//       var data = {
//         postingTitle: this.postingTitle,
//         star: this.star,
//         contents: this.contents,
//         movieTitle: title.value,
//         movieImg: posterUrl.value,
//         genre: genreNames.value
//       };
//       axios.post(url, data)
//         .then(function(response) {
//           console.log(response);
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     }
//   }
// };
</script>

<style scoped>

</style>