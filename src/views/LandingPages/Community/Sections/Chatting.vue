<script setup>
import { nextTick, ref, watchEffect } from "vue";
import { chatMessages, id, socket } from "@/socket.js";
import ConnectionState from "@/views/LandingPages/Community/Sections/ConnectionState.vue";


const message = ref("");
const chatContainer = ref(null);

function sendMessage() {
  const chat = {
    owner: id.value,
    message: message.value
  };
  chatMessages.value.push(chat);
  socket.timeout(5000).emit("chat", chat);

  message.value = "";
  // 스크롤을 새 메시지 아래로 이동시킵니다.
  nextTick(() => {
    scrollChatToBottom();
  });
}

function adjustTextarea() {
}

function scrollChatToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

watchEffect(() => {
  scrollChatToBottom();
  console.log(chatMessages.value);
});

</script>

<template>
  <ConnectionState />
  <div>
    <div class="chat-container">
      <div class="chat-messages" ref="chatContainer">
        <div v-for="(msg, index) in chatMessages" :key="index"
             :class="msg.owner === id.toString()? 'my-chat': 'their-chat'">
          <div class="message">{{ msg.message }}</div>
        </div>
      </div>
      <textarea
        style="resize: none"
        v-model="message"
        class="chat-input"
        placeholder="메시지 입력"
        @keydown.enter="sendMessage"
      />
    </div>
  </div>

</template>

<style scoped>
.chat-container {
  border: 1px solid cornflowerblue;
  display: flex;
  flex-direction: column;
  height: 80vh;
  padding: 20px;
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
  position: relative;
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
  position: relative;
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