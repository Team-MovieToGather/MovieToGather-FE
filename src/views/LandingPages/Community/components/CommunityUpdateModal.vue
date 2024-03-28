<script setup>
const props = defineProps({
  meetingId: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="정보 수정하기" color="primary" @click="alert = true" />
    <q-btn flat label="취소하기" color="primary" @click="exitForm" />

    <q-dialog v-model="alert">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6">정보 수정하기</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          정보를 수정하시겠어요?
        </q-card-section>
        <div class="row">
          <div class="col-6"></div>
          <q-btn class="col-3" flat label="네" @click="updateForm" />
          <q-btn class="col-3" flat label="아니오" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      alert: ref(false)
    };
  },
  methods: {
    updateForm() {
      this.$router.push({ name: "community-detail" });
    },
    exitForm() {
      this.$router.push({ name: "community-detail" });
    }
  }
};

</script>