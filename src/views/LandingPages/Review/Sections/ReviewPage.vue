<script setup>
import ReviewCard from "@/views/LandingPages/Review/component/ReviewCard.vue";
import { computed, onMounted, ref } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import { useRouter } from "vue-router";
import { searchReview as reviewAPI } from "@/api";


const rawReviews = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
// const searchUrl = `http://localhost:8080/api/reviews/search`;
const searchCondition = ref('MOVIE_TITLE');
const pageSize = 9;
// const totalPages = computed(() => Math.ceil(rawReviews.value.length / pageSize));

// 검색 조건 변경 함수
const changeSearchCondition = (condition) => {
  searchCondition.value = condition;
};

const props = defineProps({
  review: Object
})

const router = useRouter();
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
    }
  })
}


onMounted(() => fetchReviews());
const fetchReviews = () => {
  // 기본 검색 조건 또는 사용자 입력에 따른 리뷰 조회
  reviewAPI.fetchReviews(searchCondition.value, searchQuery.value, currentPage.value - 1, pageSize)
    .then(data => {
      rawReviews.value = data.content;
      console.log('data[0] : ', data.content[0]);
    })
    .catch(error => console.error("리뷰 조회 실패", error));
};

// 검색 실행 함수
const searchReviews = () => {
  currentPage.value = 1; // 첫 페이지로 리셋
  fetchReviews(); // 검색 실행
};

// 페이지 변경 함수
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    fetchReviews();
  }
};

const totalPages = computed(() => {
  const total = Math.ceil(rawReviews.value.length / pageSize);
  return total >= 0 ? total : 0; // 음수가 되지 않도록 보장
});

</script>

<template>
  <div class="container justify-space-between py-2">

    <div class="search-and-dropdown">
      <!-- 검색 조건 드롭다운 -->
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          {{ searchCondition === 'MOVIE_TITLE' ? '영화 제목' : '리뷰 제목' }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#" @click="changeSearchCondition('POSTING_TITLE')">리뷰 제목</a></li>
          <li><a class="dropdown-item" href="#" @click="changeSearchCondition('MOVIE_TITLE')">영화 제목</a></li>
        </ul>
      </div>



<!--    검색창-->
     <div class="search-container">
        <MaterialInput
          :value="searchQuery"
         @input="searchQuery = $event.target.value"
          @keyup.enter="searchReviews"
          icon="search"
         placeholder="리뷰를 검색해 보세요!"
          type="text"
          class="input-group-dynamic mb-2"
          :label="{ class: 'form-label' }"
         style="height: 50px"
       />
      </div>

    <!--     리뷰 목록-->

      <div v-if="rawReviews.length > 0">
        <div class="q-pa-md">
          <div class="row q-gutter-sm">
            <ReviewCard
              v-for="(review, index) in rawReviews.slice((currentPage - 1) * 9, currentPage * 9)"
              :key="index"
              :review="review"
              class="col-3"
              @review-selected="review => goToDetailReview(review)"
            />
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        No review info available.
      </div>






    <!--    페이지네이션-->
    <div class="container">
      <section class="py-7">
        <div class="container">
          <div class="row justify-space-between py-2">
            <div class="container">
              <MaterialPagination :color="'success'" :size="'md'">
                <MaterialPaginationItem :label="'Prev'" :disabled="currentPage === 1" @click="changePage(currentPage - 1)" />
                <MaterialPaginationItem v-for="page in totalPages" :key="page" :label="page.toString()" :active="page === currentPage" @click="changePage(page)" />
                <MaterialPaginationItem :label="'Next'" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)" />
              </MaterialPagination>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>

  </div>
</template>

<style lang="sass" scoped>
.example-item
  height: 400px
  width: 400px

.dropdown-menu
  cursor: pointer

</style>