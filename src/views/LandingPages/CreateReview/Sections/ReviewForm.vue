<script setup>
import { onMounted, ref } from "vue";
import MaterialButton from "@/components/MaterialButton.vue";
import FormTitle from "@/views/LandingPages/CreateReview/Sections/FormTitle.vue";
import { useRoute, useRouter } from "vue-router";
import { getMember, postReview, updateReview } from "@/api";
import { apiClient } from "@/api/index";

const router = useRouter();
const route = useRoute();

const movieTitle = ref(route.query.title);
const movieImg = ref(route.query.posterUrl);
const genreNames = ref(route.query.genreNames);

const props = defineProps({
  mode: {
    type: String,
    default: "create"
  },
  reviewId: String,
});

const postingTitle = ref('');
const contents = ref('');
const memberInfo = ref({ nickname: null });

// edit 모드일 때 기존 리뷰 데이터를 불러옵니다.
onMounted(async () => {
  console.log("mode: ", props.mode);
  console.log("reviewId: ", props.reviewId);
  console.log("title: ", movieTitle);
});


const submitForm = async () => {


    if (props.mode === 'edit') {
      // Update review
      try {
        console.log('id: ', props.reviewId);
        await updateReview(props.reviewId, postingTitle.value, contents.value);
        console.log("리뷰 수정 성공 id: ", props.reviewId)
        await router.push({ name: 'review' }); // 리뷰 목록으로 리다이렉트
      } catch (error) {
        if (error.response.status === 401 ) {
          alert("본인이 작성한 게시물이 아닙니다.")
        }
        console.error("리뷰 수정 실패 id: ", props.reviewId, error);
      }

    } else {
      // Create new review
      try {
        await postReview(
          movieTitle.value,
          movieImg.value,
          genreNames.value,
          postingTitle.value,
          contents.value
        )

        console.log("리뷰 생성 성공")
        await router.push({ name: 'review' }); // 리뷰 목록으로 리다이렉트

      } catch (error) {
        console.error("리뷰 생성 실패", error)
      }


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
import { ref } from "vue";
</script>

<style scoped>

</style>