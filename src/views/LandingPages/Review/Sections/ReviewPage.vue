<script setup>
import ReviewCard from "@/views/LandingPages/Review/component/ReviewCard.vue";
import { computed, onMounted, ref } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import { useRouter } from "vue-router";
import { searchReview, searchReview as reviewAPI } from "@/api";


const rawReviews = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
// const searchUrl = `http://localhost:8080/api/reviews/search`;
const searchCondition = ref('MOVIE_TITLE');
const pageSize = 9;
const totalElements = ref(0); // 전체 요소 개수
const totalPages = ref(0); // 전체 페이지 수
const pageNumbers = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

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
    path: `/pages/landing-pages/review/${review.id}`,
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


onMounted(() =>
  fetchReviews()
);
const fetchReviews = async () => {

  try {
    const response = await searchReview(searchCondition.value, searchQuery.value, currentPage.value -  1, pageSize)
    rawReviews.value = response.data.content;
    totalPages.value = response.data.totalPages;
    totalElements.value = response.data.totalElements;
    console.log('totalPages: ', response.data.totalPages);
    console.log('리뷰 조회 성공');
  } catch (error) {
    console.error('리뷰 조회 실패', error);
  }
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

const loadPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchReviews();
  }
};

const loadNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchReviews();
  }
};


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
              v-for="(review, index) in rawReviews"
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
                <MaterialPaginationItem :label="'Prev'" :disabled="currentPage.value === 1" @click="loadPreviousPage" />
                <MaterialPaginationItem v-for="page in pageNumbers" :key="page" :label="page.toString()"
                                        :active="page === currentPage.value" @click="() => changePage(page)" />
                <MaterialPaginationItem :label="'Next'" :disabled="currentPage.value === totalPages.value" @click="loadNextPage" />
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