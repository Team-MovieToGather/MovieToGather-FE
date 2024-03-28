<script setup>
defineProps({
  movie: Object
});
</script>

<template>
  <div @click="$emit('movie-selected', movie)">
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img :src="movie.posterUrl" />
        <q-card-section>
          <div class="row">
            <div class="text-h5 col-8">{{ movie.title }}</div>
          </div>
          <div class="row">
            <div class="col-6">{{ movie.shortOverview }}</div>
          </div>
          <div class="row mt-2">
            <div class="col-8">Genre : {{ movie.genreNames }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>