<script setup>
import ReviewCard from "@/views/LandingPages/Review/component/ReviewCard.vue";
import CustomPagination from "@/components/CustomPagination.vue";
</script>

<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <q-intersection
        v-for="index in 9"
        :key="index"
        class="example-item"
      >
        <ReviewCard
          created-at="2012/12/12"
          genre="코미디"
          heart="10"
          name="재영"
          movie-title="재미없는영화"
          posting-title="의외로재미있는"
          image="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-intersection>
    </div>
  </div>
  <div class="container">
    <CustomPagination />
  </div>

</template>

<style lang="sass" scoped>
.example-item
  height: 400px
  width: 400px
</style>