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
      clicked: "영화제목",
    };
  },
  methods: {
    clickedItem(item) {
      this.clicked = item;
    },
  },
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

<!--    영화 목록-->
    <div class="row">
      <CommunityMovieList />
    </div>

  </div>

<!--    tmdb 로고-->
    <div>
      <span class="text-black">Open API:      </span>
      <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                                                          alt="The Movie Database (TMDb) Logo"
                                                          class="tmdb-logo">
    </div>



</template>
<style>
.tmdb-logo {
  width: 120px;
  margin: 10px auto 10px auto;
}
</style>