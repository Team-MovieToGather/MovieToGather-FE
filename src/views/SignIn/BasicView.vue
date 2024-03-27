<script setup>
import { onMounted } from "vue";

import Header from "@/examples/Header.vue";
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <NavbarLoggedIn transparent />
  <header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    로그인
                  </h4>
                </div>
              </div>
              <div class="card-body" id="GoogleLogin">
                <form role="form" class="text-start">
                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      type="button"
                      @click.prevent="loginWithGoogle"
                      fullWidth
                    >구글 로그인
                    </MaterialButton>
                  </div>
                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                      type="button"
                      @click.prevent="loginWithKakao"
                    >카카오 로그인
                    </MaterialButton>
                  </div>
                  <div class="text-center" id="naverLoginBtn">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      type="button"
                      @click.prevent="loginWithNaver"
                      fullWidth
                    >네이버 로그인
                    </MaterialButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a
                  href="https://www.creative-tim.com"
                  class="font-weight-bold text-white"
                  target="_blank"
                >Creative Tim</a
                >
                for a better web.
              </div>
            </div>
            <div class="col-12 col-md-6">
              <ul
                class="nav nav-footer justify-content-center justify-content-lg-end"
              >
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    class="nav-link text-white"
                    target="_blank"
                  >Creative Tim</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/presentation"
                    class="nav-link text-white"
                    target="_blank"
                  >About Us</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/blog"
                    class="nav-link text-white"
                    target="_blank"
                  >Blog</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com/license"
                    class="nav-link pe-0 text-white"
                    target="_blank"
                  >License</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </header>
</template>
<script>
export default {
  name: "Login",
  data() {
    return{};
  },
  mounted() {
    this.checkAndStoreTokens();
  },
  methods: {
    loginWithKakao() {
      const REST_API_KEY = "2e108c0efaed0b62af32afb27ff62354";
      const REDIRECT_URI = "http://localhost:3000/oauth-redirect-kakao";
      window.location.href =
        "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
        REST_API_KEY +
        "&redirect_uri=" +
        REDIRECT_URI;
    },
    loginWithNaver() {
      const NAVER_CLIENT_ID = ""
      const NAVER_REDIRECT_URL = "http://localhost:3000/oauth-redirect-naver"
      const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + NAVER_CLIENT_ID + '&redirect_uri=' + NAVER_REDIRECT_URL;

      window.location.href = url;
    },
    loginWithGoogle() {
      const GOOGLE_CLIENT_ID = ""
      const GOOGLE_REDIRECT_URL = "http://localhost:3000/oauth-redirect-google"
      const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + GOOGLE_CLIENT_ID + '&redirect_uri=' + GOOGLE_REDIRECT_URL + '&response_type=code' + '&scope=email profile';
      window.location.href = url;
    },
    checkAndStoreTokens() {
      const accessToken = this.getCookie("accessToken");
      const refreshToken = this.getCookie("refreshToken");
      if (accessToken && refreshToken) {
        this.storeTokens(accessToken, refreshToken);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    },
    storeTokens(accessToken, refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  },
}
</script>

