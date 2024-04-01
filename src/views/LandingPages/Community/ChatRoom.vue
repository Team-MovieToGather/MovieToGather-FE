<script setup>
// example components
import Header from "../../../examples/Header.vue";

// sections
import Footer from "./Sections/AuthorFooter.vue";


// image
import image from "@/assets/img/city-profile.jpg";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";
import Chatting from "@/views/LandingPages/Community/Sections/Chatting.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { meetingInfo as getMeeting, searchMeetings } from "@/api";

const extractMeetingIdFromUrl = () => {
  const route = useRoute();
  const parts = route.path.split("/");
  return parts[parts.length - 1];
};

const meetingId = extractMeetingIdFromUrl();
const meeting = ref({});
const searchCondition = ref("MOVIE_TITLE");
const searchKeyword = ref("");
const displayedMeetings = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);


const fetchData = async () => {
  // getMeeting
  //     .fetch(meetingId)
  //     .then((data) => {
  //       console.log(data);
  //       meeting.value = data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Handle errors
  //     });
  console.log("키워드 : ", searchKeyword.value);
  const params = {
    locationType: "ALL",
    searchCondition: searchCondition.value,
    page: currentPage.value - 1,
    size: 9,
    sort: "string",
    keyword: searchKeyword.value
  };

  if (searchKeyword.value) {
    params.keyword = searchKeyword.value;
  }


  try {
    const response = await searchMeetings(params);
    displayedMeetings.value = response.data.content;
    totalPages.value = response.data.totalPages; // 전체 페이지 수 업데이트
    console.log("totalPages : ", response.data.totalPages);
    // console.log('data : ', response.data.content);
  } catch (error) {
    console.error("모임 정보 가져오기 실패", error);
  }


};
onMounted(fetchData);

</script>
<template>
  <NavbarLoggedIn transparent />
  <Header>
    <div
      class="page-header min-height-400"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <Chatting :meeting-id="meetingId" />
  </div>
  <div class="mt-5">
    <Footer />
  </div>

</template>
