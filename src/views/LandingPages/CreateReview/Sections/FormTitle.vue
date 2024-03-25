<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-7 text-center mx-auto position-relative">
        <h3
          class="text-black pt-3 mt-n5 me-2"
          :style="{ display: 'inline-block'}"
        >
          {{ props.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>