<script setup>
import { onMounted, ref } from "vue";

//example components
import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//image
//material components
// material-input
import image from "@/assets/img/illustrations/illustration-signin.jpg";
import setMaterialInput from "@/assets/js/material-input";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { apiClient } from "@/api/index";
const memberInfo = ref({ nickname: null });

async function getMemberInfo() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await apiClient.get("/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    memberInfo.value.nickname = response.data.nickname;
    memberInfo.value.email = response.data.email;
    memberInfo.value.provider = response.data.provider;
    return memberInfo.value.nickname;
  } catch (error) {
    console.log("실패");
  }
}

onMounted(async () => {
  await getMemberInfo();
});
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarLoggedIn
          :sticky="true"
        />
      </div>
    </div>
  </div>
  <section>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
          >
            <div
              class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
              :style="{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              }"
              loading="lazy"
            ></div>
          </div>
          <div
            class="mt-8 col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
          >
            <div
              class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
            >
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg p-3"
                >
                  <h3 class="text-white text-success mb-0">내 정보 보기</h3>
                </div>
              </div>
              <div class="card-body">
                <div>
                  <h4>이메일</h4>
                  <div>{{ memberInfo.email }}</div>
                </div>
                <div class="mt-4">
                  <h4>닉네임</h4>
                  <div>{{ memberInfo.nickname }}</div>
                </div>
                <div class="mt-4">
                  <h4>회원등급</h4>
                  <div>일반회원</div>
                </div>
                <div class="mt-4">
                  <h4>로그인 방법</h4>
                  <div>{{ memberInfo.provider }}</div>
                </div>
                <div class="container mt-4">
                  <div class="row justify-space-between text-center py-2">
<!--                    <div class="mx-auto">-->
<!--                      <RouterLink :to="{ name: 'member-update' }">-->
<!--                        <MaterialButton variant="gradient" color="secondary" class="w-auto me-2">정보 수정하기-->
<!--                        </MaterialButton>-->
<!--                      </RouterLink>-->

<!--                    </div>-->
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <DefaultFooter />
</template>
