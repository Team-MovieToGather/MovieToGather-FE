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
  address: {
    type: String,
    required: true
  },
  isOffline: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean,
    required: true
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
  <div class="q-px-lg q-py-md">
    <div class="row">
      <h2 class="col-6 text-h4">모임명</h2>
      <p class="col-6 text-md-end">{{ checkOffline(isOffline) }}</p>
    </div>
    <div class="row mt-4">
      <strong class="col-6">영화제목</strong>
      <p class="col-6 text-md-end">{{movieName}}</p>
    </div>
    <div class="row">
      <strong class="col-6">모집기간</strong>
      <p class="col-6 text-md-end">{{startTime}} ~ {{endTime}}</p>
    </div>
    <div class="row">
      <strong class="col-6">장소</strong>
      <p class="col-6 text-md-end">{{ address }}</p>
    </div>
    <div class="row">
      <strong class="col-6">인원</strong>
      <p class="col-6 text-md-end">{{numApplicants}}/{{maxApplicants}}</p>
    </div>
    <div class="row">
      <strong class="col-6">상태</strong>
      <p class="col-6 text-md-end">{{isClosed ? "마감" : "모집중"}}</p>
    </div>
  </div>
</template>
<style>
.mydiv {
  border: 1px solid black;
}
</style>
<script>


export default {
  methods: {
    checkOffline(isOffline) {
      if (isOffline === "OFFLINE") {
        return "오프라인";
      } else {
        return "온라인";
      }
    }
  }
};

</script>
