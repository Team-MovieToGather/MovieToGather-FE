<template>
  <div>
    <div class="chat-container">
      <div class="chat-messages">
        <div
          v-for="(msg, index) in chatMessages"
          :key="index"
          :class="msg.sender === 'me' ? 'my-chat' : 'their-chat'"
        >
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

export default {
  name: "Chatting",
  setup() {
    const message = ref("");
    const chatMessages = ref([]);
    const roomId = ref("");

    const ws = new WebSocket("ws://localhost:8080/ws/api/meetings/1/chat");

    ws.onopen = function () {
      console.log("Connected to WebSocket server");
      enterChatroom(); // 연결되면 채팅방에 입장
    };

    ws.onmessage = function (event) {
      console.log("Received message from server:", event.data);
      const chatMessage = JSON.parse(event.data);
      chatMessages.value.push(chatMessage);
      scrollToBottom();
    };

    ws.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    ws.onclose = function () {
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

    const sendMessage = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const sendChat = {
          type: "TALK",
          roomId: roomId.value,
          sender: "me",
          message: message.value,
        };
        ws.send(JSON.stringify(sendChat));
        message.value = "";
      }
      scrollToBottom();
    };

    const enterChatroom = async () => {
      try {
        const roomResponse = await axios.get(
            "http://localhost:8080/api/meetings/1/chat/chatRoom"
        );
        roomId.value = roomResponse.data.roomId;
        console.log("Entered chat room with ID:", roomId.value);

        const enterChat = {
          type: "ENTER",
          roomId: roomId.value,
          sender: "me",
          message: "입장",
        };
        ws.send(JSON.stringify(enterChat)); // WebSocket을 통해 입장 메시지를 서버로 전송합니다.
      } catch (error) {
        console.error("Error entering chat room:", error);
      }
    };

    onMounted(() => {
      const fetchData = async () => {
        const roomResponse = await axios.get(
            "http://localhost:8080/api/meetings/1/chat/chatRoom"
        );
        roomId.value = roomResponse.data.roomId;
        const messagesResponse = await axios.get(
            "http://localhost:8080/api/meetings/1/chat/messages"
        );
        chatMessages.value = messagesResponse.data;
        scrollToBottom()
      };
      // 데이터 가져오기
      fetchData();
      scrollToBottom(); // 채팅방 진입 후 맨 아래로 스크롤
    });

    onBeforeUnmount(() => {
      disconnectWebSocket();
    });

    return { message, chatMessages, sendMessage };
  },
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
