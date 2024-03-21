<script setup>
const props = defineProps({
  meetingName: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  numApplicants: {
    type: Number,
    required: true
  },
  maxApplicants: {
    type: Number,
    required: true
  }
});
</script>
<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="row">
          <div class="text-h6 col-8">{{ props.meetingName }}</div>
          <div class="col-4 text-md-end">
            {{ props.type }}
          </div>
        </div>
        <div class="row">
          <div class="col-8">{{ props.movieName }}</div>
          <div class="col-4 text-md-end">{{ props.numApplicants }}/{{ props.maxApplicants }}</div>
        </div>
        <div class="row mt-2">
          <div>{{ props.startTime }} ~ {{ props.endTime }}</div>
        </div>
        <div class="text-grey">
          {{ props.isClosed ? "마감" : "모집중" }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>