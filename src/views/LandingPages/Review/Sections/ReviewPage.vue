<script setup>
import ReviewCard from "@/views/LandingPages/Review/component/ReviewCard.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import { useRouter } from "vue-router";


const rawReviews = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
const totalPages = 3;
const searchUrl = `http://localhost:8080/api/reviews/search`;

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


// export default {
//   data() {
//     return {
//       clicked: "리뷰 제목"
//     };
//   },
//   methods: {
//     clickedItem(item) {
//       this.clicked = item;
//     }
//   }
// };
onMounted(() => fetchReviews());
  const fetchReviews = async () => {
    try {
      const response = await axios.get(searchUrl + '?searchCondition=MOVIE_TITLE&keyword=');
      rawReviews.value = response.data.content;
      // console.log("review: ", rawReviews.value);
    } catch (error) {
      console.error("리뷰를 불러오지 못했습니다.", error)
    }
  };

// 검색 실행 함수
const searchReviews = () => {
  currentPage.value = 1; // 새 검색을 시작할 때마다 첫 페이지로 리셋
  fetchReviews();
};

  const changePage = (newPage) => {
    currentPage.value = newPage;
    fetchReviews()
  };

</script>

<template>

  <div class="container justify-space-between py-2">
<!--    버튼-->
<!--    <div class="dropdown">-->
<!--      <MaterialButton-->
<!--        variant="gradient"-->
<!--        color="info"-->
<!--        class="dropdown-toggle"-->
<!--        :class="{ show: showDropdown }"-->
<!--        @focusout="showDropdown = false"-->
<!--        id="dropdownMenuButton"-->
<!--        data-bs-toggle="dropdown"-->
<!--        :area-expanded="showDropdown"-->
<!--        @click="showDropdown = !showDropdown"-->
<!--      ><span>{{ clicked }}</span></MaterialButton-->
<!--      >-->
<!--      <ul-->
<!--        class="dropdown-menu px-2 py-3"-->
<!--        :class="{ show: showDropdown }"-->
<!--        aria-labelledby="dropdownMenuButton"-->
<!--      >-->
<!--        <li>-->
<!--          <a-->
<!--            class="dropdown-item border-radius-md"-->
<!--            href="javascript:;"-->
<!--            @click="clickedItem('제목')"-->
<!--          >리뷰 제목</a-->
<!--          >-->
<!--        </li>-->
<!--        <li>-->
<!--          <a-->
<!--            class="dropdown-item border-radius-md"-->
<!--            href="javascript:;"-->
<!--            @click="clickedItem('영화제목')"-->
<!--          >영화 제목</a-->
<!--          >-->
<!--        </li>-->
<!--        <li>-->
<!--          <a-->
<!--            class="dropdown-item border-radius-md"-->
<!--            href="javascript:;"-->
<!--            @click="clickedItem('작성자')"-->
<!--          >작성자</a-->
<!--          >-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->


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





    <!--    페이지네이션-->
    <div class="container">
      <section class="py-7">
        <div class="container">
          <div class="row justify-space-between py-2">
            <div class="col-lg-2 mx-auto">
              <MaterialPagination>
                <MaterialPaginationItem
                  v-for="n in totalPages"
                  :key="n"
                  :label="n.toString()"
                  :active="n === currentPage"
                  @click="changePage(n)"
                />
              </MaterialPagination>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>

</template>

<style lang="sass" scoped>
.example-item
  height: 400px
  width: 400px
</style>