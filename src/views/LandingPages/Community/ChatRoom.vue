<script setup>
// example components
import Header from "../../../examples/Header.vue";

// sections
import Footer from "./Sections/AuthorFooter.vue";
import Profile from "./Sections/AuthorProfile.vue";
import Posts from "./Sections/AuthorPosts.vue";
import Contact from "./Sections/AuthorContact.vue";

// image
import image from "@/assets/img/city-profile.jpg";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";
import Chatting from "@/views/LandingPages/Community/Sections/Chatting.vue";
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
    <Chatting />
  </div>
  <div class="mt-5">
    <Footer />
  </div>

</template>
