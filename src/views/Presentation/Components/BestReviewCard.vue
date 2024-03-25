<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  name: {
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
        <div class="text-h5 q-mt-sm q-mb-xs">{{ props.title }}</div>
        <div class="text-caption text-md-end text-grey">
          Written by {{ props.name }}
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