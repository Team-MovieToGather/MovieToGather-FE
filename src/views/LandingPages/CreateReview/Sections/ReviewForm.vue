<script setup>

import MaterialButton from "@/components/MaterialButton.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import FormTitle from "@/views/LandingPages/CreateReview/Sections/FormTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section>
    <div class="container py-4">
      <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
        <FormTitle :title="title" />
        <form role="form" id="contact-form" method="post" autocomplete="off">
          <div class="card-body">
            <div class="mb-4">
              <MaterialInput
                class="input-group-dynamic"
                :label="{ text: '리뷰 제목', class: 'form-label' }"
                type="email"
              />
            </div>
            <MaterialTextArea
              class="input-group-static mb-4"
              id="message"
              :rows="4"
            >리뷰 내용 입력하기
            </MaterialTextArea
            >
            <div class="container">
              <div class="row justify-space-between text-center py-2">
                <div class="col-12 mx-auto">
                  <RouterLink :to="{ name: 'about' }">
                    <MaterialButton variant="gradient" color="secondary" class="w-auto me-2">리뷰 저장하기</MaterialButton>
                  </RouterLink>
                  <RouterLink :to="{ name: 'about' }">
                    <MaterialButton variant="gradient" color="primary" class="w-auto me-2">작성 취소하기</MaterialButton>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>