<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
//sections
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import CommunityMovieList from "@/views/LandingPages/Community/Sections/CommunityMovieList.vue";

//hooks

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
              모임 만들기
            </h1>

            <p class="lead mb-4 text-white opacity-8">
              영화에 대해 함께 이야기해보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <div class="container row justify-space-between py-2">
      <div class="dropdown">
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
              @click="clickedItem('제목')"
            >제목</a
            >
          </li>
          <li>
            <a
              class="dropdown-item border-radius-md"
              href="javascript:"
              @click="clickedItem('영화제목')"
            >영화 제목</a
            >
          </li>
          <li>
            <a
              class="dropdown-item border-radius-md"
              href="javascript:"
              @click="clickedItem('작성자')"
            >작성자</a
            >
          </li>
        </ul>
      </div>
      <div>
        <MaterialInput
          class="input-group-dynamic mb-2"
          :label="{ class: 'form-label' }"
          icon="search"
          type="text"
          placeholder="Search"
        ></MaterialInput>
      </div>
    </div>
    <div class="row">
      <CommunityMovieList />
    </div>

  </div>

</template>
