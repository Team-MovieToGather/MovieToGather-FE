<script setup>
//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
//sections
import NavbarNoDropdown from "@/examples/navbars/NavbarNoLogin.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

//hooks

</script>
<script>
import CommunityForm from "@/views/LandingPages/Community/Sections/CommunityForm.vue";

export default {
  components: { CommunityForm },
  props: ["data"],
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
    <CommunityForm />
  </div>
  <FooterDefault />

</template>
