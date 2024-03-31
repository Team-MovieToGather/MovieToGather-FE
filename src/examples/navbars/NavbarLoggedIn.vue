<script setup>

import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useWindowsWidth } from "@/assets/js/useWindowsWidth";
// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import { apiClient } from "@/api/index";

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);

// 로그인 상태를 나타내는 반응형 참조 변수
const isLoggedIn = ref(false);
const router = useRouter();

// 로그인 상태를 체크하는 함수
function checkLoginStatus() {
  const token = localStorage.getItem("accessToken");
  if (token == null) {
    //TODO 쿠키토큰을 로컬스토리지로 옮기는 로직
  }
  isLoggedIn.value = !!token; // 토큰의 존재 여부에 따라 true 또는 false 할당
  console.log(isLoggedIn.value);
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem("accessToken"); // 로컬 스토리지에서 accessToken 제거
  localStorage.removeItem("refreshToken"); // 로컬 스토리지에서 accessToken 제거
  isLoggedIn.value = false; // 로그인 상태 업데이트
  router.push("/");
}

// 컴포넌트가 마운트되었을 때 로그인 상태 체크
onMounted(checkLoginStatus);

// 로컬 스토리지의 변경을 감시하고 로그인 상태 업데이트
// 사용자가 다른 탭에서 로그인/로그아웃할 경우에도 UI가 적절히 반응하도록 함
watchEffect(() => {
  window.addEventListener("storage", checkLoginStatus);
  // 이벤트 리스너 제거를 위한 클린업 함수
  return () => {
    window.removeEventListener("storage", checkLoginStatus);
  };
});
const memberInfo = ref({ nickname: null });

async function getMemberInfo() {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get("/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    memberInfo.value.nickname = response.data.nickname;
    console.log(memberInfo.value.nickname);
    return memberInfo.value.nickname;
  } catch (error) {
    console.log("실패");
  }
}

const nickname = memberInfo.value.nickname;

onMounted(async () => {
  await getMemberInfo();
});
</script>
<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      // navbar dropdown 안겹침
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      // 삭제하면 navbar 없어짐, 근데 기본 색상은 어디서 설정?
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3',
        ]"
        :to="{ name: 'presentation' }"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        MovieToGather
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        MovieToGather
      </RouterLink>
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <!--아이콘-->
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              리뷰
              <!--드롭다운 화살표-->
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <!--드롭다운-->
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <RouterLink
                        :to="{ name: 'review' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>리뷰 검색하기</span>
                      </RouterLink>
                      <a
                        href="https://www.themoviedb.org/?language=ko"
                        class="dropdown-item border-radius-md"
                      >
                        <span>TMDB 들어가보기</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <RouterLink
                  :to="{ name: 'review' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>리뷰 검색하기</span>
                </RouterLink>
                <a
                  href="https://www.themoviedb.org/?language=ko"
                  class="dropdown-item border-radius-md"
                >
                  <span>TMDB 들어가보기</span>
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuBlocks"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >view_day</i
              >
              커뮤니티
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <RouterLink
                        :to="{ name: 'community' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>모임 검색하기</span>
                      </RouterLink>
                      <!--
                      <RouterLink
                        :to="{ name: 'my-meeting' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>내 모임</span>
                      </RouterLink>
                      -->
                      <!--
                      <RouterLink
                        :to="{ name: 'chatroom' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>채팅</span>
                      </RouterLink>
                      -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <RouterLink
                  :to="{ name: 'community' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>모임 검색하기</span>
                </RouterLink>
                <!--
<RouterLink
  :to="{ name: 'my-meeting' }"
  class="dropdown-item border-radius-md"
>
  <span>내 모임</span>
</RouterLink>

<RouterLink
  :to="{ name: 'chatroom' }"
  class="dropdown-item border-radius-md"
>
  <span>채팅</span>
</RouterLink>
-->
              </div>
            </div>
          </li>
          <li v-if="isLoggedIn" class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <!--아이콘-->
              <strong>{{
                  memberInfo.nickname
                }}</strong>
              <!--드롭다운 화살표-->
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <!--드롭다운-->
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <RouterLink
                        :to="{ name: 'member-info' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>내정보 보기</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'signin-basic' }"
                        class="dropdown-item border-radius-md"
                        @click="logout"
                      >
                        <span>로그아웃</span>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-lg-none">
                <RouterLink
                  :to="{ name: 'member-info' }"
                  class="dropdown-item border-radius-md"
                >
                  <span>내정보 보기</span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'signin-basic' }"
                  class="dropdown-item border-radius-md"
                  @click="logout"
                >
                  <span>로그아웃</span>
                </RouterLink>
              </div>
            </div>
          </li>
          <router-link
            v-else
            to="/pages/landing-pages/basic"
            class="font-weight-bolder text-center mt-2 mb-0"
            :class="getTextColor()"
          >로그인
          </router-link
          >
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
