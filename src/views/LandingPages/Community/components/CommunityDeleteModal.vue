<script setup>

</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn @click="enterForm" color="blue" label="모임 수정하기" />
    <q-btn label="모임 삭제하기" color="danger" @click="inception = true" />

    <q-dialog v-model="inception">
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h6"><strong>모임 삭제하기</strong></div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          정말 모임을 삭제하시겠어요?
        </q-card-section>

        <div class="row">
          <div class="col-6"></div>
          <q-btn class="col-3" flat label="네" @click="deleteCommunity" />
          <q-btn class="col-3" flat label="아니오" v-close-popup />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">모임 삭제</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          모임이 삭제되었습니다.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="exitCommunity" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { deleteCommunity } from "@/api"; // import the deleteCommunity function from your API file

export default {
  props: {
    meetingId: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      inception: ref(false),
      secondDialog: ref(false)
    };
  },
  methods: {
    enterForm() {
      this.$router.push({ name: "update-community", params: { id: this.meetingId } });
    },
    exitCommunity() {
      this.$router.push({ name: "community" });
    },
    async deleteCommunity() {
      try {
        // Call the deleteCommunity function from the API
        let meetingId = this.meetingId;
        await deleteCommunity(meetingId);
        // If the deletion is successful, show the second dialog
        this.secondDialog = true;
      } catch (error) {
        console.error("Error deleting community:", error);
      }
    }
  }
};
</script>
