<script setup>

import MaterialButton from "@/components/MaterialButton.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialInput from "@/components/MaterialInput.vue";
</script>

<template>
  <form id="contact-form" method="post" autocomplete="off">
    <div class="card-body p-0 my-3">
      <div class="form-group mb-0 mt-md-0 mt-4">
        <MaterialInput
          id="message"
          class="input-group-static mb-4"
          :rows="6"
          label="닉네임"
          placeholder="변경할 닉네임을 입력하세요"
        >How can we help you?</MaterialInput
        >
      </div>
      <div class="row">
        <div class="col-6 text-center">
          <RouterLink :to="{ name: 'member-info' }">
          <MaterialButton
            variant="gradient"
            color="success"
            class="mt-3 mb-0"
          >수정하기</MaterialButton
          >
          </RouterLink>
        </div>
        <div class="col-6 text-center">
          <RouterLink :to="{ name: 'member-info' }">
          <MaterialButton
            variant="gradient"
            color="danger"
            class="mt-3 mb-0"
          >취소하기</MaterialButton
          >
          </RouterLink>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>