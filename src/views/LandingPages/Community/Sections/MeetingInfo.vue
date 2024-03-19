<script setup>
const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  isOffline: {
    type: Boolean,
    default: false,
  },
});
</script>


<template>
  <div class="q-px-lg q-py-md">
    <div class="row">
      <h2 class="col-6 text-h4">모임명</h2>
      <p class = "col-6 text-md-end" v-if="{isOffline:true}">오프라인</p>
      <p class = "col-6 text-md-end" v-else>온라인</p>
    </div>
    <div class ="row">
      <p class="col-6">모집기간</p>
      <p class = "col-6 text-md-end">2024.01.01. 00:00 ~ 2024.02.02. 23:00</p>
    </div>
    <div class = "row">
      <p class="col-6">장소</p>
      <p class = "col-6 text-md-end">{{address}}</p>
    </div>
    <div class = "row">
      <p class="col-6">인원</p>
      <p class = "col-6 text-md-end">1/30</p>
    </div>
    <div class = "row">
      <p class="col-6">상태</p>
      <p class = "col-6 text-md-end">모집중</p>
    </div>
  </div>
</template>
<script setup>
</script>
<style>
.mydiv {
  border: 1px solid black;
}
</style>