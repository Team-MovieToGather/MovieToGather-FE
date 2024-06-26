<script setup>
import MeetingInfo from "@/views/LandingPages/Community/Sections/MeetingInfo.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import KakaoMap from "@/views/LandingPages/Community/components/KakaoMap.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import CommunityDeleteModal from "@/views/LandingPages/Community/components/CommunityDeleteModal.vue";
import { useRoute, useRouter} from "vue-router";
import { getChatRoom, getMeetings, joinMeetings, postChatRoom } from "@/api";

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
const fetchData = async () => {
  try {
    const response = await getMeetings(meetingId);
    meeting.value = response.data;
  } catch (error) {
    console.error(error);

  }
};
onMounted(fetchData);
const joinMeeting = async () => {
  try {
    await joinMeetings(meetingId);
    alert("모임 참가 성공!");
  } catch (error) {
    console.error("모임 참가 실패", error);
    alert("모임 참가 실패");
  }
};

const socket = ref(null);
const roomId = ref("");

const router = useRouter();

// 라우터의 beforeEnter 가드를 설정합니다.
router.beforeEach(async (to, from, next) => {
  if (to.name === 'chatroom') {
    const conditionMet = await getChatRoom(meetingId);
    if (!conditionMet) {
      next(false); // 이동을 중단합니다.
    } else {
      next(); // 이동을 허용합니다.
    }
  } else {
    next(); // chatroom 이외의 다른 페이지로의 이동은 허용합니다.
  }
});

const handleChatroomEntry = async (event) => {
  console.log("handleChatroomEntry 메소드 실행됨");
  try {
    // 여기에 채팅방 입장 조건을 확인하는 로직을 추가합니다.
    const conditionMet = await getChatRoom(meetingId);
    console.log(conditionMet)

    // 만약 조건을 충족하지 않으면 페이지 이동을 막습니다.
    if (!conditionMet) {
      console.error("채팅방 입장 조건을 충족하지 않습니다.");
      event.preventDefault();
      return false; // 이동 중단
    }

    // 조건을 충족하면 채팅방으로 이동합니다.
    await enterChatroom();
  } catch (error) {
    console.error("채팅방 입장 조건을 확인하는 동안 오류가 발생했습니다:", error.message);
    alert("채팅방 입장 조건을 충족하지 않습니다.");
  }
  }

const enterChatroom = async () => {
  try {
    const roomResponse = await getChatRoom(meetingId);
    console.log(meetingId);
    console.log(roomResponse.data);
    roomId.value = roomResponse.data.roomId;
    console.log(roomId.value);

    if (!roomId.value) {
      console.error("Room ID is undefined.");
      joinChatroom();
      await createChatroom();
    }
  } catch (error) {
    console.error("Error fetching room:", error);
  }
};

const joinChatroom = () => {
  // 웹 소켓 열기
  socket.value = new WebSocket(
    import.meta.env.VITE_APP_EC2_WEBSOKET_URL + `/ws/api/meetings/${meetingId}/chat`
  );

  // 서버로 입장 메시지 전송
  socket.value.onopen = function() {
    const enterMessage = {
      type: "ENTER",
      roomId: roomId.value,
      sender: "system",
      message: "입장"
    };
    socket.value.send(JSON.stringify(enterMessage));
  };
};

const createChatroom = async () => {
  try {
    const name = "채팅방 이름"; // 요청 바디에 포함할 이름 데이터

    const createResponse = await postChatRoom(meetingId, name)

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

    setTimeout(async () => {
      console.log("setTimeout 실행")
      await enterChatroom()
    }, 3000);
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
      <div class="col-12 mt-5">
        <MeetingInfo :address="meeting.locationUrl" :is-offline="meeting.type" :movie-name="meeting.movieName"
                     :num-applicants="meeting.numApplicants" :is-closed="meeting.isClosed"
                     :max-applicants="meeting.maxApplicants" :meeting-name="meeting.meetingName"
                     :start-time="meeting.startTime" :end-time="meeting.endTime" />
      </div>
    </div>
    <div class="row">
      <div class="col-11" />
      <q-btn class="col-1" @click="joinMeeting" color="green" label="모임 신청" />
    </div>

  </div>

  <div class="container mt-5 mydiv" v-if="meeting.type === 'OFFLINE'">
    <KakaoMap :keyword="meeting.locationUrl" />
  </div>
  <div class="container text-md-end mt-5 mydiv">
    <div class="row q-pa-md q-gutter-sm text-md-end">
      <CommunityDeleteModal :meeting-id="meetingId" />
      <RouterLink :to="{ name: 'chatroom', params: { id: meetingId } }">
        <q-btn @click="handleChatroomEntry" color="black" label="채팅방 입장" />
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
