<script setup>
import BestReviewCard from "@/views/Presentation/Components/BestReviewCard.vue";
import DefaultTitle from "@/views/Presentation/Components/DefaultTitle.vue";
</script>
<template>
  <section>
    <div class="container q-pa-md">
      <div class="row">
        <DefaultTitle title="Best Review 3"></DefaultTitle>
        <div class="col-lg-4" v-for="n in 3" :key="n">
          <BestReviewCard
            image="https://cdn.quasar.dev/img/parallax2.jpg"
            name="재영"
            title="리뷰제목"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
