<template>
  <div class="container mt-5 md-5">
    <div class="row q-pa-md" style="max-width: 800px">

      <q-form
        class="q-gutter-md"
      >
        <h6>모임명</h6>
        <q-input
          filled
          v-model="title"
          label="2자 이상 20자 미만"
        />
        <h6>시작일</h6>
        <div class="row">
          <q-input class="col" v-model="date" filled type="date" />
          <q-input class="col" v-model="time" filled type="time" />
        </div>
        <h6>종료일</h6>
        <div class="row">
          <q-input class="col" v-model="date" filled type="date" />
          <q-input class="col" v-model="time" filled type="time" />
        </div>
        <div class="mx-auto mt-4">
          <CommunityUpdateModal />
        </div>
      </q-form>

    </div>
  </div>
</template>
<script setup>
import CommunityUpdateModal from "@/views/LandingPages/Community/components/CommunityUpdateModal.vue";
</script>