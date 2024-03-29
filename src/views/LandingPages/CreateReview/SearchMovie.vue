<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
//sections

import MoviePage from "@/views/LandingPages/Review/Sections/MoviePage.vue";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";
</script>
<script>

</script>


<template>
  <NavbarLoggedIn
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
              리뷰 작성하기
            </h1>

            <p class="lead mb-4 text-white opacity-8">
              여러분의 영화 경험을 나누어보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">

    <!--영화 목록-->
    <div class="container">
      <MoviePage />
    </div>

  </div>
  <!--  tmdb 로고  -->
  <div>
    <span class="text-black">Open API:      </span>
    <img
      src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
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