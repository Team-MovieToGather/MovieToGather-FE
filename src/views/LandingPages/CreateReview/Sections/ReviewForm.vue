<script setup>

import MaterialButton from "@/components/MaterialButton.vue";
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
        <form role="form" id="contact-form" v-on:submit.prevent="submitForm">
          <div class="card-body">
            <h4>리뷰 제목</h4>
            <div class="mb-4">
              <q-input v-model="postingTitle" stack-label :dense="dense" />
            </div>
            <h4>별점</h4>
            <div class="mb-4">
              <q-input v-model="star" stack-label :dense="dense" />
            </div>
            <h4>리뷰 내용</h4>
            <div class="q-pa-md" style="max-width: 800px">
              <q-input
                v-model="contents"
                filled
                type="textarea"
              />
            </div>
            <div class="container">
              <div class="row justify-space-between text-center py-2">
                <div class="col-12 mx-auto">
                  <MaterialButton type="submit" variant="gradient" color="secondary" class="w-auto me-2">리뷰 저장하기
                  </MaterialButton>

                  <MaterialButton @click="cancelForm" variant="gradient" color="primary" class="w-auto me-2">작성 취소하기
                  </MaterialButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  data() {
    return {
      postingTitle: ref(""),
      star: ref(0),
      contents: ref("")
    };
  },
  methods: {
    submitForm() {
      console.log(this.postingTitle, this.star, this.contents);
      const url = "http://localhost:8080/api/reviews";
      const data = {
        postingTitle: this.postingTitle,
        star: this.star,
        contents: this.contents
      };
      axios.post(url, data)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "about" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelForm() {
      this.$router.push({ name: "about" });
    }
  }
};
</script>

<style scoped>

</style>