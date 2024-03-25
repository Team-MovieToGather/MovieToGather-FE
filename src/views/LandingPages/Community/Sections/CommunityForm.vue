<template>
  <div class="container mt-5 md-5">
    <div class="q-pa-md" style="max-width: 800px">

      <q-form
        @submit.prevent ="submitForm"
        @reset="onReset"
        class="q-gutter-md row"
      >
        <h6>모임명</h6>
        <q-input
          filled
          v-model="form.meetingName"
          label="2자 이상 20자 미만"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <h6>시작일</h6>
        <div class="row">
          <q-input class="col" v-model="form.startDate" filled type="date" />
          <q-input class="col" v-model="form.startTime" filled type="time" />
        </div>
        <h6>종료일</h6>
        <div class="row">
          <q-input class="col" v-model="form.endDate" filled type="date" />
          <q-input class="col" v-model="form.endTime" filled type="time"/>
        </div>
        <h6>모집인원</h6>
        <q-input
          filled
          type="number"
          v-model="form.maxApplicants"
          label="인원"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || '참석 인원을 입력해주세요',
          val => val > 0 && val < 100 || '올바른 인원을 입력해주세요'
        ]"/>
        <h6>온라인/오프라인</h6>
        <IsOnline @update:type="form.type = $event" @update:locationUrl="form.locationUrl = $event"/>
        <div>
          <q-btn label="모임 등록하기" type="submit" color="primary" />
          <q-btn label="등록 취소하기" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>


    </div>
  </div>
</template>

<script>
import { date, useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import IsOnline from "@/views/LandingPages/Community/Sections/IsOnline.vue";
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import axios from "axios";
import { defineComponent } from "vue";

export default {
  components: {
    IsOnline,
  },
  setup() {
    const route = useRoute();
    const form = ref({
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      type: 'ONLINE',
      locationUrl: '',
      isClosed: false,
      maxApplicants: 1,
      meetingName: '',
      movieName: route.query.title || '',
    });

    const submitForm = async () => {
      const payload = {
        meetingName: form.value.meetingName,
        movieName: form.value.movieName,
        startTime: `${form.value.startDate}T${form.value.startTime}`,
        endTime: `${form.value.endDate}T${form.value.endTime}`,
        type: form.value.type,
        locationUrl: form.value.locationUrl,
        isClosed: form.value.isClosed,
        numApplicants: 1,
        maxApplicants: form.value.maxApplicants,
      };

      try {
        await axios.post('http://localhost:8080/api/meetings', payload);
        alert('모임 생성 성공!');
      } catch (error) {
        console.error('모임 생성 실패', error);
        alert('모임 생성 실패');
      }
    };

    const onReset = () => {
      form.value = {
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        type: 'ONLINE',
        locationUrl: '',
        isClosed: false,
        maxApplicants: 30,
        meetingName: '',
        movieName: route.query.title || '',
      };
    };

    onMounted(() => {
      console.log('모임 영화 제목 : ', route.query.title);
    });

    return {
      form,
      submitForm,
      onReset };
  },
};
</script>
