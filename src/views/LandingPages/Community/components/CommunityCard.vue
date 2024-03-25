<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
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
  isClosed: {
    type: Boolean,
    required: true
  },
  numApplicants: {
    type: String,
    required: true
  },
  maxApplicants: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['click']);
const redirectToMeetingDetail = () => {
  // 카드 클릭 시 해당 카드의 id를 부모 컴포넌트로 emit
  const meetingId = props.id;
  emit("redirectToMeetingDetail", meetingId);
};
</script>
<template>
  <div class="q-pa-md items-start q-gutter-md" @click="redirectToMeetingDetail">
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