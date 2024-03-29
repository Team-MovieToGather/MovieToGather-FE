<template>
  <div class="main">
    <div class="box">
      <h2 class="form-title">카카오 로그인</h2>
      <form @submit.prevent="">
      </form>
    </div>
  </div>
</template>

<script>
import {apiClient} from "@/api/client";

export default {
  name: 'OauthRedirectKakao',
  mounted() {
    const code = new URL(window.location.href).searchParams.get("code");
    this.kakao(code)
  },
  methods: {
    async kakao(code) {
      try {
        const response = await apiClient.get("/oauth2/callback/kakao", {
          params: { code }
        });
        // 일반 로그인 성공 시, 서버 응답으로부터 바로 토큰을 저장합니다.
        this.storeTokens(response.data.accessToken, response.data.refreshToken);
        this.$router.push('/');
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    },
    checkAndStoreTokens() {
      const accessToken = this.getCookie('accessToken');
      const refreshToken = this.getCookie('refreshToken');
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
  }
}

</script>

<style scoped>

</style>