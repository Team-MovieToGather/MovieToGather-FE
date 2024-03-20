<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  postingTitle: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  heart: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});
</script>
<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img :src="props.image" />
      <q-card-section>
        <div class="row">
          <div class="text-h5 col-8">{{ props.postingTitle }}</div>
          <div class="col-4 text-md-end">
            <q-btn flat round color="red" icon="favorite" />
            {{ props.heart }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">{{ props.movieTitle }}</div>
        </div>
        <div class="row mt-2">
          <div class="col-8">{{ props.createdAt }}</div>
          <div class="col-4 text-caption text-md-end text-grey">
            Written by {{ props.name }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>