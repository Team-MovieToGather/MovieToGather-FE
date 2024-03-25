<script setup>
import { onMounted, onUnmounted, ref } from "vue";
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
import Typed from "typed.js";

//sections
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import CommunitySection from "@/views/LandingPages/Community/Sections/CommunitySection.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<script>
export default {
  data() {
    return {
      clicked: "영화제목"
    };
  },
  methods: {
    clickedItem(item) {
      this.clicked = item;
    }
  }
};
</script>
<template>
  <NavbarNoDropdown
    :action="{
      route: 'basic',
      label: '로그인',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              영화를 함께 <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>보고</h1>
              <h1>즐기고</h1>
              <h1>이야기하고</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8">
              여러분의 영화 경험을 나누어보세요
            </p>
            <button type="submit" class="btn bg-white text-dark">
              <RouterLink
                :to="{ name: 'community-search-movie' }">모임 만들기
              </RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <div class="container">
      <div class="row justify-space-between py-2">
        <div class="dropdown col-2">
          <MaterialButton
            variant="gradient"
            color="info"
            class="dropdown-toggle"
            :class="{ show: showDropdown }"
            @focusout="showDropdown = false"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            :area-expanded="showDropdown"
            @click="showDropdown = !showDropdown"
          ><span>{{ clicked }}</span></MaterialButton
          >
          <ul
            class="dropdown-menu px-2 py-3"
            :class="{ show: showDropdown }"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a
                class="dropdown-item border-radius-md"
                href="javascript:"
                @click="clickedItem('모임명')"
              >모임명</a
              >
            </li>
            <li>
              <a
                class="dropdown-item border-radius-md"
                href="javascript:"
                @click="clickedItem('영화 제목')"
              >영화 제목</a
              >
            </li>
          </ul>
        </div>
        <div class="col-8 text-md-end">
          <MaterialInput
            class="input-group-dynamic mb-2"
            :label="{ class: 'form-label' }"
            icon="search"
            type="text"
            placeholder="Search"
          ></MaterialInput>
        </div>
      </div>
    </div>
    <CommunitySection />
  </div>
  <FooterDefault />
</template>
