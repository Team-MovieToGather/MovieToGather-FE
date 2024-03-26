<template>
  <div class="container">
      <div class="row justify-space-between py-2">

        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            {{ searchCondition === 'MOVIE_TITLE' ? '영화 제목' : '모임명' }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#" @click="changeSearchCondition('MOVIE_TITLE')">영화 제목</a></li>
            <li><a class="dropdown-item" href="#" @click="changeSearchCondition('MEETING_TITLE')">모임명</a></li>
          </ul>
        </div>



        <div class="col-8 text-md-end">
          <MaterialInput
            v-model="searchKeyword"
            @input="searchKeyword = $event.target.value"
            @keyup.enter="fetchData"
            icon="search"
            placeholder="모임을 검색해 보세요!"
            type="text"
            class="input-group-dynamic mb-2"
            :label="{ class: 'form-label' }"
            style="height: 50px"
          ></MaterialInput>
        </div>
      </div>
    </div>







    <!-- 게시물 표시 -->
    <div v-if="displayedMeetings && displayedMeetings.length > 0">
      <div class="row">
        <CommunityCard class="col-4"
                       v-for="meeting in displayedMeetings" :key="meeting.id"
                       :max-applicants="meeting.maxApplicants" :num-applicants="meeting.numApplicants"
                       :type="meeting.type" :end-time="meeting.endTime" :start-time="meeting.startTime"
                       :movie-name="meeting.movieName" :meeting-name="meeting.meetingName"
                       :is-closed="meeting.isClosed" :id="meeting.id"
                       @redirectToMeetingDetail="handleMeetingClick" />
      </div>
    </div>
    <div v-else>
      No meeting info available.
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <MaterialPagination :color="'success'" :size="'md'">
        <MaterialPaginationItem :label="'Prev'" :disabled="currentPage === 1" @click="prevPage" />
        <MaterialPaginationItem v-for="page in totalPages" :key="page" :label="page.toString()"
                                :active="page === currentPage" @click="handlePageChange(page)" />
        <MaterialPaginationItem :label="'Next'" :disabled="currentPage === totalPages" @click="nextPage" />
      </MaterialPagination>
    </div>
</template>

<script setup>
import { searchCommunity } from "@/api";
import axios from "axios";
import CommunityCard from "@/views/LandingPages/Community/components/CommunityCard.vue";

import { computed, defineEmits, onMounted, ref } from "vue";
import router from "@/router";
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import MaterialInput from "@/components/MaterialInput.vue";

const emit = defineEmits(["handleMeetingClick"]);

const loading = ref(false);
const meetingInfo = ref({ content: [] }); // Ensure proper reactivity
const displayedMeetings = ref([]); // Currently displayed meetings
let currentPage = 1; // Current page number
const pageSize = 9; // Number of meetings per page
const searchCondition = ref("MOVIE_TITLE");
const searchKeyword = ref("");


const changeSearchCondition = (condition) => {
  searchCondition.value = condition;
};

const fetchData = async () => {
  loading.value = true;
  const params = {
    type: "ALL",
    searchCondition: searchCondition.value,
    page: currentPage - 1,
    size: pageSize,
    sort: "string",
  };

  // 검색창이 비어있지 않으면 keyword 파라미터를 추가
  if (searchKeyword.value.trim() !== "") {
    params.keyword = searchKeyword.value;
  }

  try {
    const response = await axios.get('http://localhost:8080/api/meetings', { params });
    meetingInfo.value = response.data.content;
    updateDisplayedMeetings();
    console.log(response.data.content);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);


const updateDisplayedMeetings = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // meetingInfo.value에서 직접 .slice를 호출합니다.
  displayedMeetings.value = meetingInfo.value.slice(startIndex, endIndex);
};

const nextPage = () => {
  if (currentPage < totalPages.value) {
    currentPage++;
    updateDisplayedMeetings();
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    updateDisplayedMeetings();
  }
};

const totalPages = computed(() => {
  return meetingInfo.value && meetingInfo.value.length
    ? Math.ceil(meetingInfo.value.length / pageSize)
    : 0;
});
const handleMeetingClick = (meetingId) => {
  // Handle the click event here
  console.log("Meeting clicked:", meetingId);
  // Navigate to the detail view of the clicked meeting
  router.push({ name: "community-detail", params: { id: meetingId } });
};

const handlePageChange = (newPage) => {
  currentPage = newPage;
  updateDisplayedMeetings();
};

</script>