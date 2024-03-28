<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";

//Vue Material Kit 2 components

// sections

//images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import BestReviewSection from "@/views/Presentation/Sections/BestReviewSection.vue";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarLoggedIn :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              MovieToGather
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              함께 영화를 즐겨보세요
              <q-icon name="favorite" color="red" size="32px" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <BestReviewSection />
  </div>
  <DefaultFooter />
</template>
