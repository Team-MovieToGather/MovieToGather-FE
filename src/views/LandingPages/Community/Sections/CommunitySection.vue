<template>
  <div class="container">
    <div class="row justify-space-between py-2">
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                aria-expanded="false">
          {{ searchCondition === "MOVIE_TITLE" ? "영화 제목" : "모임명" }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#" @click="changeSearchCondition('MOVIE_TITLE')">영화 제목</a></li>
          <li><a class="dropdown-item" href="#" @click="changeSearchCondition('MEETING_TITLE')">모임명</a></li>
        </ul>
      </div>

      <div class="col-8 text-md-end">
        <MaterialInput
          v-model="searchKeyword"
          :value="searchKeyword"
          @input="searchKeyword = $event.target.value"
          @keyup.enter="fetchMeetings"
          icon="search"
          placeholder="모임을 검색해 보세요!"
          type="text"
          class="input-group-dynamic mb-2"
          :label="{ class: 'form-label' }"
          style="height: 50px"
        ></MaterialInput>
      </div>
    </div>

    <div v-if="displayedMeetings.length > 0">
      <div class="q-pa-md">
        <div class="row q-gutter-sm">
          <CommunityCard
            class="col-3"
            v-for="meeting in displayedMeetings"
            :key="meeting.id"
            :max-applicants="meeting.maxApplicants"
            :num-applicants="meeting.numApplicants"
            :type="meeting.type"
            :end-time="meeting.endTime"
            :start-time="meeting.startTime"
            :movie-name="meeting.movieName"
            :meeting-name="meeting.meetingName"
            :is-closed="meeting.isClosed"
            :id="meeting.id"
            @redirectToMeetingDetail="handleMeetingClick"
          />
        </div>
      </div>
    </div>
    <div v-else>
      No meeting info available.
    </div>

    <div class="container">
      <section class="py-7">
        <div class="container">
          <div class="row justify-space-between py-2">
            <div class="col-lg-2 mx-auto">
              <MaterialPagination :color="'success'" :size="'md'">
                <MaterialPaginationItem :label="'Prev'" :disabled="currentPage === 1" @click="prevPage" />
                <MaterialPaginationItem v-for="page in totalPages" :key="page" :label="page.toString()"
                                        :active="page === currentPage" @click="handlePageChange(page)" />
                <MaterialPaginationItem :label="'Next'" :disabled="currentPage === totalPages" @click="nextPage" />
              </MaterialPagination>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import CommunityCard from "@/views/LandingPages/Community/components/CommunityCard.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import { onMounted, ref } from "vue";
import router from "@/router";

const searchCondition = ref("MOVIE_TITLE");
const searchKeyword = ref("");
const displayedMeetings = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const baseUrl = "http://localhost:8080/api/meetings";

const fetchMeetings = async () => {
  console.log("키워드 : ", searchKeyword.value);
  const params = {
    type: "ALL",
    searchCondition: searchCondition.value,
    page: currentPage.value - 1,
    size: 9,
    sort: "string"
  };

  if (searchKeyword.value) {
    params.keyword = searchKeyword.value;
  }


  try {
    const response = await axios.get(baseUrl, { params });
    displayedMeetings.value = response.data.content;
    totalPages.value = response.data.totalPages; // 전체 페이지 수 업데이트
    console.log("totalPages : ", response.data.totalPages);
    // console.log('data : ', response.data.content);
  } catch (error) {
    console.error("모임 정보 가져오기 실패", error);
  }
};

const changeSearchCondition = (condition) => {
  searchCondition.value = condition;
  currentPage.value = 1;
  fetchMeetings(); // 검색 조건 변경 시 목록을 다시 불러옵니다.
};

const handleMeetingClick = (meetingId) => {
  router.push({ name: "community-detail", params: { id: meetingId } });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchMeetings(); // 이전 페이지의 데이터를 불러옵니다.
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchMeetings(); // 다음 페이지의 데이터를 불러옵니다.
  }
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchMeetings(); // 선택된 페이지의 데이터를 불러옵니다.
};

// 컴포넌트 마운트 시 첫 페이지 데이터 로드
onMounted(() => {
  fetchMeetings();
});
</script>
