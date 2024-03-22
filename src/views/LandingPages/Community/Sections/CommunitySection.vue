<template>
  <div class="container">
    <!-- 게시물 표시 -->
    <div v-if="displayedMeetings && displayedMeetings.length > 0">
      <div class="row">
        <CommunityCard class="col-4"
                       v-for="meeting in displayedMeetings" :key="meeting.id"
                       :max-applicants="meeting.maxApplicants" :num-applicants="meeting.numApplicants"
                       :type="meeting.type" :end-time="meeting.endTime" :start-time="meeting.startTime"
                       :movie-name="meeting.movieName" :meeting-name="meeting.meetingName"
                       :is-closed="meeting.isClosed"  :id="meeting.id"
                       @redirectToMeetingDetail="handleMeetingClick" />
      </div>
    </div>
    <div v-else>
      No meeting info available.
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { meetingInfo as meetingInfoApi } from "@/api";
import CommunityCard from "@/views/LandingPages/Community/components/CommunityCard.vue";
import { computed, onMounted, ref, defineEmits } from 'vue';
import router from "@/router";

const emit = defineEmits(['handleMeetingClick']);

const loading = ref(false);
const meetingInfo = ref({ content: [] }); // Ensure proper reactivity
const displayedMeetings = ref([]); // Currently displayed meetings
let currentPage = 1; // Current page number
const pageSize = 9; // Number of meetings per page

const fetchData = () => {
  loading.value = true;
  meetingInfoApi
    .fetch()
    .then((data) => {
      meetingInfo.value = data;
      updateDisplayedMeetings();
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    })
    .finally(() => (loading.value = false));
};

const updateDisplayedMeetings = () => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  displayedMeetings.value = meetingInfo.value.content.slice(startIndex, endIndex);
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

const totalPages = computed(() => Math.ceil(meetingInfo.value.content.length / pageSize));

const handleMeetingClick = (meetingId) => {
  // Handle the click event here
  console.log('Meeting clicked:', meetingId);
  // Navigate to the detail view of the clicked meeting
  router.push({ name: 'community-detail', params: { id: meetingId } });
};

onMounted(fetchData);
</script>