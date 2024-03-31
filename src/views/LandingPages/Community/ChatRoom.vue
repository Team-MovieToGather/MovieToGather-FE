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
import { meetingInfo as getMeeting } from "@/api";

const extractMeetingIdFromUrl = () => {
  const route = useRoute();
  const parts = route.path.split("/");
  return parts[parts.length - 1];
};

const meetingId = extractMeetingIdFromUrl();
const meeting = ref({});
const fetchData = () => {
  getMeeting
      .fetch(meetingId)
      .then((data) => {
        console.log(data);
        meeting.value = data;
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
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
