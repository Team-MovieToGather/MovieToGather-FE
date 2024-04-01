<template>
  <div>
    <div class="chat-container">
      <div class="chat-messages">
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="msg.type === 'ENTER' ? 'enter-message' : msg.sender === sender ? 'my-chat' : 'their-chat'"
        >
          <div class="message" v-if="msg.type !== 'ENTER'">{{ msg.sender }}</div>
          <div class="message">{{ msg.message }}</div>
        </div>
      </div>
    </div>
    <textarea
      style="width: 1000px"
      v-model="message"
      class="chat-input"
      placeholder="메시지 입력"
      @keydown.enter.prevent="sendMessage"
    />
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref} from "vue";
import { getChatMessage, getChatRoom } from "@/api";
import { apiClient } from "@/api/index";

export default {
  name: "Chatting",
  props: {
    meetingId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const message = ref("");
    const chatMessages = ref([]);
    const roomId = ref("");
    const sender = ref("")

    const ws = new WebSocket(
      import.meta.env.VITE_APP_EC2_WEBSOKET_URL +
        `/ws/api/meetings/${props.meetingId}/chat`
    );

    ws.onopen = function() {
      console.log("Connected to WebSocket server");
      enterChatroom(); // 연결되면 채팅방에 입장
    };

    ws.onmessage = function(event) {
      console.log("Received message from server:", event.data);
      const chatMessage = JSON.parse(event.data);
      chatMessages.value.push(chatMessage);
      scrollToBottom();
    };

    ws.onerror = function(error) {
      console.error("WebSocket error:", error);
    };

    ws.onclose = function() {
      console.log("Disconnected from WebSocket server");
    };

    const disconnectWebSocket = () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };

    const scrollToBottom = () => {
      const chatContainer = document.querySelector(".chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };
    
    async function getMemberInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await apiClient.get("/members", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        sender.value = response.data.nickname;
        console.log(sender.value);
        return sender.value;
      } catch (error) {
        console.log("실패");
      }
    }

    const sendMessage = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const sendChat = {
          type: "TALK",
          roomId: roomId.value,
          sender: sender.value,
          message: message.value
        };
        ws.send(JSON.stringify(sendChat));
        message.value = "";
      }
      scrollToBottom();
    };

    const enterChatroom = async () => {
      try {
        const roomResponse = await getChatRoom(props.meetingId)
        roomId.value = roomResponse.data.roomId;
        console.log("Entered chat room with ID:", roomId.value);

        const enterChat = {
          type: "ENTER",
          roomId: roomId.value,
          sender: sender.value,
          message: "입장"
        };
        ws.send(JSON.stringify(enterChat)); // WebSocket을 통해 입장 메시지를 서버로 전송합니다.
      } catch (error) {
        console.error("Error entering chat room:", error);
      }
    };

    onMounted(() => {
      const getNickName = async () => {
        await getMemberInfo();
      }
      getNickName();
      const fetchData = async () => {
        const roomResponse = await getChatRoom(props.meetingId)
        roomId.value = roomResponse.data.roomId;
        const messagesResponse = await getChatMessage(props.meetingId)
        chatMessages.value = messagesResponse.data;
        scrollToBottom();
      };
      // 데이터 가져오기
      fetchData();
      scrollToBottom(); // 채팅방 진입 후 맨 아래로 스크롤
    });

    onBeforeUnmount(() => {
      disconnectWebSocket();
    });

    return { sender, message, chatMessages, sendMessage };
  }
};
</script>

<style scoped>
.chat-container {
  border: 1px solid cornflowerblue;
  display: flex;
  flex-direction: column;
  height: 80vh;
  padding: 20px;
  overflow-y: auto;
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.my-chat {
  align-self: flex-end;
  background-color: #0084ff;
  color: #fff;
  max-width: 70%;
  padding: 8px;
  margin: 8px 8px 8px 0;
  border-radius: 6px;
  text-align: right;
}

.their-chat {
  align-self: flex-start;
  background-color: #f0f0f0;
  max-width: 70%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 6px;
  text-align: left;
  color: #282828;
}

.enter-message {
  background-color: #e0e0e0;
  max-width: 70%;
  padding: 8px;
  margin: 5px auto 5px auto;
  border-radius: 6px;
  text-align: center;
  color: #282828;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  background-color: #0084ff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
