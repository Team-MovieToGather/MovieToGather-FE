<template>
  <div class="container mt-5 md-5">
    <div class="q-pa-md" style="max-width: 800px">

      <q-form
        @submit.prevent="submitForm"
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
          <q-input class="col" v-model="form.endTime" filled type="time" />
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
        ]" />
        <h6>온라인/오프라인</h6>
        <IsOnline @update:type="form.type = $event" @update:locationUrl="form.locationUrl = $event"
                  @update:roadAddress="form.locationUrl = $event" />
        <div>
          <q-btn @click="submitForm" type="button" label="모임 등록하기" color="primary" />
          <q-btn @click="onReset" type="button" label="등록 취소하기" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import IsOnline from "@/views/LandingPages/Community/Sections/IsOnline.vue";
import { useRoute } from "vue-router";
import DaumMap from "@/views/LandingPages/Community/components/DaumMap.vue";
import { postMeetings } from "@/api";

export default {
  components: {
    DaumMap,
    IsOnline
  },
  setup() {
    const route = useRoute();
    const form = ref({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      locationType: "ONLINE",
      locationUrl: "",
      isClosed: false,
      maxApplicants: 1,
      meetingName: "",
      movieName: route.query.title || ""
    });

    const submitForm = async () => {
      // Wait for the updateLocationUrl event to be processed
      await new Promise((resolve) => {
        // Add a short delay to ensure Vue has time to process the update
        setTimeout(resolve, 100); // Adjust delay time as needed
      });

      // Now form.locationUrl should be properly updated
      const payload = {
        meetingName: form.value.meetingName,
        movieName: form.value.movieName,
        startTime: `${form.value.startDate}T${form.value.startTime}`,
        endTime: `${form.value.endDate}T${form.value.endTime}`,
        locationType: form.value.locationType,
        locationUrl: form.value.locationUrl,
        isClosed: form.value.isClosed,
        maxApplicants: form.value.maxApplicants
      };

      try {
        await postMeetings(payload);
        alert("모임 생성 성공!");
      } catch (error) {
        console.error("모임 생성 실패", error);
        alert("모임 생성 실패");
      }
    };

    const onReset = () => {
      form.value = {
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        type: "ONLINE",
        locationUrl: "",
        isClosed: false,
        maxApplicants: 30,
        meetingName: "",
        movieName: route.query.title || ""
      };
    };

    onMounted(() => {
      console.log("모임 영화 제목 : ", route.query.title);
    });

    return {
      form,
      submitForm,
      onReset
    };

  }
};
</script>
