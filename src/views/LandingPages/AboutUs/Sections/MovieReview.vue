<script setup>
defineProps({
  movieImg: String,
  postingTitle: String,
  heart: Number,
  movieTitle: String,
  genre: String,
  contents: String,
  createdAt: String,
  name: String
});
</script>



<template>
  <div class="q-px-lg q-py-md">
    <div class="row">
      <h2 class="col-6 text-h4">{{ postingTitle }}</h2>
      <p class = "col-6 text-md-end"><q-btn flat round color="red" icon="favorite" />{{ heart }}</p>
    </div>
    <div class ="row">
      <p class="col-6">Written By {{ name }}</p>
      <p class = "col-6 text-md-end">{{ createdAt }}</p>
    </div>
    <div>
      <p class="col-6">{{ contents }}</p>
    </div>
  </div>
</template>

<style>
.mydiv {
  border: 1px solid black;
}
</style>