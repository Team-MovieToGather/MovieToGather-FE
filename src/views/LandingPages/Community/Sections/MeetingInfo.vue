<script setup>
const props = defineProps({
  address: {
    type: String,
    required: true
  },
  isOffline: {
    type: String,
    required: true
  }
});
</script>


<template>
  <div class="q-px-lg q-py-md">
    <div class="row">
      <h2 class="col-6 text-h4">모임명</h2>
      <p class="col-6 text-md-end" >{{checkOffline(isOffline)}}</p>
    </div>
    <div class="row mt-4">
      <strong class="col-6">영화제목</strong>
      <p class="col-6 text-md-end">재미없는영화</p>
    </div>
    <div class="row">
      <strong class="col-6">모집기간</strong>
      <p class="col-6 text-md-end">2024.01.01. 00:00 ~ 2024.02.02. 23:00</p>
    </div>
    <div class="row">
      <strong class="col-6">장소</strong>
      <p class="col-6 text-md-end">{{ address }}</p>
    </div>
    <div class="row">
      <strong class="col-6">인원</strong>
      <p class="col-6 text-md-end">1/30</p>
    </div>
    <div class="row">
      <strong class="col-6">상태</strong>
      <p class="col-6 text-md-end">모집중</p>
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
