<script setup>
import { useRouter } from 'vue-router';
import MovieCard from "@/views/LandingPages/Review/component/MovieCard.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";

const rawMovies = ref([]);
const currentPage = ref(1);
const searchQuery = ref("");
const totalPages = 3;
const localGetMovies = `http://localhost:8080/api/reviews/movies`;

const props = defineProps({
  movie: Object
})
const router = useRouter();
function goToCommunityForm(movie) {
  router.push({
    name: 'create-community',
    query: {
      title: movie.title,
      posterUrl: movie.posterUrl,
      genreNames: movie.genreNames,
      mode: 'create'
    }
  })
}

onMounted(() => fetchMovies());
const fetchMovies = async () => {
  const url = `${localGetMovies}?title=${encodeURIComponent(searchQuery.value)}`;

  try {
    const response = await axios.get(url);
    rawMovies.value = response.data.content;
    console.log("response: ", response.data);

  } catch (error) {
    console.error("영화를 불러오지 못했습니다.", error);
  }
};


const searchMovies = () => {
  currentPage.value = 1;
  console.log(searchQuery.value);
  fetchMovies();
};


const changePage = (newPage) => {
  currentPage.value = newPage;
  fetchMovies()
};
</script>


<template>
  <div>
    <!-- 검색 창 -->
    <div class="search-container">
      <MaterialInput
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        @keyup.enter="searchMovies"
        icon="search"
        placeholder="리뷰를 작성할 영화 제목을 검색해보세요!"
        type="text"
        class="input-group-dynamic mb-2"
        :label="{ class: 'form-label' }"
        style="height: 50px"
      />
    </div>

    <!--     영화 목록-->

    <div class="q-pa-md">
      <div class="row q-gutter-sm">
        <MovieCard
          v-for="(movie, index) in rawMovies.slice((currentPage - 1) * 9, currentPage * 9)"
          :key="index"
          :movie="movie"
          class="col-3"
          @movie-selected="movie => goToCommunityForm(movie)"
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
