<script>
import { apiClient } from "@/api/index";

export default {
  name: "OauthRedirectNaver",
  mounted() {
    const code = new URL(window.location.href).searchParams.get("code");
    this.naver(code);
    this.checkAndStoreTokens();
  },
  methods: {
    async naver(code) {
      try {
        const response = await apiClient.get("/oauth2/callback/naver", {
          params: { code }
        });
        // 일반 로그인 성공 시, 서버 응답으로부터 바로 토큰을 저장합니다.aaa
        this.storeTokens(response.data.accessToken, response.data.refreshToken);
        await this.$router.push("/");
      } catch (error) {
        console.error("로그인 실패:", error);
      }
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
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    },
    storeTokens(accessToken, refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      document.cookie = `refreshToken=${refreshToken}; Max-Age=3600; Path=/`;
    }
  }
};

</script>