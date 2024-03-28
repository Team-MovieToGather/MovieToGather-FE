<script setup>
defineProps({
  review: Object
});
</script>

<template>
  <div @click="$emit('review-selected', review)">
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img :src="review.movieImg" />
        <q-card-section>
          <div class="row">
            <div class="text-h5 col-8">{{ review.postingTitle }}</div>
            <div class="col-4 text-md-end">
              <q-btn flat round color="red" icon="favorite" />
              {{ review.heart }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">{{ review.movieTitle }}</div>
          </div>
          <div class="row mt-2">
            <div class="col-8">{{ review.createdAt }}</div>
            <div class="col-4 text-caption text-md-end text-grey">
              Written by {{ review.name }}
            </div>
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