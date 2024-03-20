<template>
  <div class="container mt-5 md-5">
    <div class="q-pa-md" style="max-width: 800px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md row"
      >
        <h6>모임명</h6>
        <q-input
          filled
          v-model="text"
          label="2자 이상 20자 미만"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <h6>시작일</h6>
        <div class="row">
          <q-input class="col" v-model="date" filled type="date" />
          <q-input class="col" v-model="time" filled type="time" />
        </div>
        <h6>종료일</h6>
        <div class="row">
          <q-input class="col" v-model="date" filled type="date" />
          <q-input class="col" v-model="time" filled type="time"/>
        </div>
        <h6>모집인원</h6>
        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"/>
        <h6>온라인/오프라인</h6>
        <IsOnline/>
        <div>
          <q-btn label="모임 등록하기" type="submit" color="primary" />
          <q-btn label="등록 취소하기" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>


    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import IsOnline from "@/views/LandingPages/Community/Sections/IsOnline.vue";


export default {
  components: { IsOnline },

  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first"
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      }
    };
  }
};
</script>
