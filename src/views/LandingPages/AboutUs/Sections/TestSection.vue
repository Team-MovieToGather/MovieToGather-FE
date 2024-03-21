<script setup>
import BestReviewCard from "@/views/Presentation/Components/BestReviewCard.vue";
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="r in review.content" :key=r.id>
        <BestReviewCard
          image="https://cdn.quasar.dev/img/mountains.jpg"
          :name="r.postingTitle"
          :title="r.contents"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<script>
import { review } from "@/api";

export default {
  data() {
    return {
      loading: false,
      apiRes: "",
      error: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      review
        .fetch()
        .then((data) => {
          this.review = data;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
