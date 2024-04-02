<script setup>
import { useRouter } from "vue-router";
import MovieCard from "@/views/LandingPages/Review/component/MovieCard.vue";
import { onMounted, ref } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import { getMovies } from "@/api";

const rawMovies = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
const pageSize = 9;
const totalPages = 3;

const props = defineProps({
  movie: Object
});
const router = useRouter();

function goToReviewFrom(movie) {
  router.push({
    name: "review-form",
    query: {
      title: movie.title,
      posterUrl: movie.posterUrl,
      genreNames: movie.genreNames,
      mode: "create"
    }
  });
  console.log("title: ", movie.title);
}

onMounted(() => fetchMovies());
const fetchMovies = async () => {

  try {
    const response = await getMovies(searchQuery.value);
    rawMovies.value = response.data.content;
    console.log('영화 불러오기 성공 ', rawMovies.value[0].id);
  } catch (error) {
    if (searchQuery.value) {
      rawMovies.value = [];
      alert("영화를 찾을 수 없습니다.");
    } else {
      console.error(error);
    }
  }


};


const searchMovies = () => {
  currentPage.value = 1;
  console.log(searchQuery.value);
  fetchMovies();
};


const changePage = (newPage) => {
  currentPage.value = newPage;
  fetchMovies();
};

</script>


<template>
  <div>
    <!-- 검색 창 -->
    <div class="search-container" >
      <MaterialInput
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        @keyup.enter="searchMovies"
        icon="search"
        placeholder="!!!!   영화 제목을 검색해보세요   !!!!"
        type="text"
        class="input-group-dynamic mb-2"
        :label="{ class: 'form-label' }"
        style="height: 100px"
      />
    </div>

    <!--     영화 목록-->
    <div v-if="rawMovies.length > 0">
      <div class="q-pa-md">
        <div class="row q-gutter-sm">
          <MovieCard
            v-for="(movie, index) in rawMovies.slice((currentPage - 1) * 9, currentPage * 9)"
            :key="index"
            :movie="movie"
            class="col-3"
            @movie-selected="movie => goToReviewFrom(movie)"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      찾으시는 영화가 없습니다.
    </div>

    <!--    페이지네이션-->
    <div class="container">
      <section class="py-7">
        <div class="container">
          <div class="row justify-space-between py-2">
            <div class="col-lg-2 mx-auto">
              <MaterialPagination :color="'success'" :size="'md'">
                <MaterialPaginationItem :label="'Prev'" :disabled="currentPage === 1"
                                        @click="changePage(currentPage - 1)" />
                <MaterialPaginationItem v-for="page in totalPages" :key="page" :label="page.toString()"
                                        :active="page === currentPage" @click="changePage(page)" />
                <MaterialPaginationItem :label="'Next'" :disabled="currentPage === totalPages"
                                        @click="changePage(currentPage + 1)" />
              </MaterialPagination>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>

</template>
