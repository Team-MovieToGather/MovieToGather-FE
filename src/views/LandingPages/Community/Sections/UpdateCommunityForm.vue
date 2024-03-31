<script setup>
import { onMounted, ref } from "vue";
import { updateCommunity } from "@/api";
import MaterialButton from "@/components/MaterialButton.vue"; // import the function

const props = defineProps({
  meetingId: {
    type: String,
    required: true
  }
});

let meetingName = ref("");
const date = ref();
// For demo purposes assign range from the current date
onMounted(() => {
  const startTime = new Date();
  const endTime = new Date(new Date().setDate(startTime.getDate() + 7));
  date.value = [startTime, endTime];
});

const submitForm = async () => {
  const payload = {
    meetingName: meetingName.value,
    startTime: date.value[0],
    endTime: date.value[1]
  };
  try {
    const response = await updateCommunity(props.meetingId, payload); // use the function
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="container mt-5 md-5">
    <div class="row q-pa-md" style="max-width: 800px">
      <form>
        <h6>모임명</h6>
        <div>
          <q-input filled v-model="meetingName" :dense="dense" />
        </div>
        <div class="mt-4">
          <h6>시작일 ~ 종료일</h6>
          <VueDatePicker v-model="date" range />
        </div>
      </form>
      <MaterialButton class="mt-4" color="info" @click="submitForm">Submit</MaterialButton>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import { ref } from "vue";

export default {
  components: { VueDatePicker }

};
</script>