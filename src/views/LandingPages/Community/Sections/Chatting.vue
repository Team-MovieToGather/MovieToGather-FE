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
import { ref, onMounted } from "vue";
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
    };

    ws.onmessage = function (event) {
      console.log("Received message from server:", event.data);
      const chatMessage = JSON.parse(event.data);
      chatMessages.value.push(chatMessage);
      scrollToBottom()
    };

    ws.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    ws.onclose = function () {
      console.log("Disconnected from WebSocket server");
    };

    const scrollToBottom = () => {
      const chatContainer = document.querySelector(".chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const sendMessage = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const chat = {
          type: "TALK",
          roomId: roomId.value,
          sender: "me",
          message: message.value,
        };
        chatMessages.value.push(chat);
        ws.send(JSON.stringify(chat));
        message.value = "";
      }
    };
    onMounted(async () => {
      try {
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
        await fetchData();
        scrollToBottom()

      } catch (error) {
        console.error("Error fetching initial chat messages:", error);
      }
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
