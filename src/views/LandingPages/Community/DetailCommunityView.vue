<script setup>
import MeetingInfo from "@/views/LandingPages/Community/Sections/MeetingInfo.vue";
import { onBeforeUnmount, ref } from "vue";
import axios from "axios";
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import CommunityDeleteModal from "@/views/LandingPages/Community/components/CommunityDeleteModal.vue";
import { useRoute } from "vue-router";
import NavbarLoggedIn from "@/examples/navbars/NavbarLoggedIn.vue";

// Function to extract meeting ID from URL
const extractMeetingIdFromUrl = () => {
  const route = useRoute();
  const parts = route.path.split("/");
  return parts[parts.length - 1];
};

// 이 화면에서 사용하는 모임의 ID를 정의합니다.
const meetingId = extractMeetingIdFromUrl();
const meeting = ref({});
const fetchData = () => {
  getMeeting
    .fetch(meetingId)
    .then((data) => {
      console.log(data);
      meeting.value = data;
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    });
};
onMounted(fetchData);


const socket = ref(null);
const roomId = ref("");

const enterChatroom = async () => {
  try {
    const roomResponse = await axios.get(
      `http://localhost:8080/api/meetings/1/chat/chatRoom`
    );
    roomId.value = roomResponse.data.roomId;
    console.log(roomId.value);

    if (roomId.value) {
      joinChatroom();
    } else {
      console.error("Room ID is undefined.");
      await createChatroom();
    }
  } catch (error) {
    console.error("Error fetching room:", error);
  }
};

const joinChatroom = () => {
  // 웹 소켓 열기
  socket.value = new WebSocket(
    `ws://localhost:8080/ws/api/meetings/1/chat`
  );

  // 서버로 입장 메시지 전송
  socket.value.onopen = function() {
    const enterMessage = {
      type: "ENTER",
      roomId: roomId.value,
      sender: "me",
      message: "입장"
    };
    socket.value.send(JSON.stringify(enterMessage));
  };
};

const createChatroom = async () => {
  try {
    const name = "채팅방 이름"; // 요청 바디에 포함할 이름 데이터
    const createResponse = await axios.post(
      `http://localhost:8080/api/meetings/1/chat/chatRoom`,
      name
    );
    roomId.value = createResponse.data.roomId;
    console.log(createResponse.data.roomId);

    joinChatroom();
    socket.value.onopen = function() {
      const createChatRoom = {
        type: "TALK",
        roomId: roomId.value,
        sender: "system",
        message: "채팅방을 생성했습니다."
      };
      socket.value.send(JSON.stringify(createChatRoom));
    };
  } catch (error) {
    console.error("Error creating chat room:", error);
  }
};

onBeforeUnmount(() => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.close();
  }
});
</script>

<template>
  <NavbarLoggedIn transparent />
  <Header>
    <div
      class="page-header min-height-400"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <div class="container mydiv mt-5">
    <div class="row">
      <div class="col-3 mt-4">
        <img class="mysize"
             src="https://i.namu.wiki/i/mREUnCFVkCakteF2HcHHBIRdyOXls-AHbWkAG7AuHsyqr80WjV7jHUrnmoN3JPaQrLNJLnZjq4oaicSQKoPsPR-wKEBWeycMTA3Qeq8_an5P3q-Z-dcuf0yRWEeEdHJ_Mvpm9heCwScnHKzNQn9TKhVdB1joitx-sdGGeSKHEas.webp"
        />
      </div>
      <div class="col-9 mt-5">
        <MeetingInfo :address="meeting.locationUrl" :is-offline="meeting.type" :movie-name="meeting.movieName"
                     :num-applicants="meeting.numApplicants" :is-closed="meeting.isClosed"
                     :max-applicants="meeting.maxApplicants" :meeting-name="meeting.meetingName"
                     :start-time="meeting.startTime" :end-time="meeting.endTime" />
      </div>
    </div>
  </div>

  <div class="container mt-5 mydiv" v-if="meeting.type === 'OFFLINE'">
    <KakaoMap :keyword="meeting.locationUrl" />
  </div>
  <div class="container text-md-end mt-5 mydiv">
    <div class="row q-pa-md q-gutter-sm">
      <CommunityDeleteModal :meeting-id="meetingId" />
      <RouterLink :to="{ name: 'chatroom' }">
        <q-btn @click="enterChatroom" color="black" label="채팅방 입장" />
      </RouterLink>
    </div>
  </div>
  <FooterDefault />
</template>
<style scoped>
.mysize {
  width: 200px;
  height: 300px;
}

.mydiv {
  border: 1px solid black;
}

</style>
