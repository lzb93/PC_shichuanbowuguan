<script setup>
import { ref } from 'vue';

// 消息列表，每条消息包含文本、是否为用户消息和头像路径
const messages = ref([
  {
    text: '欢迎来到聊天界面！',
    isUser: false,
    avatar: 'https://via.placeholder.com/50x50?text=Other'
  }
]);

// 输入框中的消息
const inputMessage = ref('');

// 消息显示区域的 DOM 引用
const messagesRef = ref(null);

// 用户头像路径
const userAvatar = 'https://via.placeholder.com/50x50?text=You';

// 发送消息的方法
const sendMessage = () => {
  if (inputMessage.value.trim()) {
    // 添加用户发送的消息
    messages.value.push({
      text: inputMessage.value,
      isUser: true,
      avatar: userAvatar
    });
    // 清空输入框
    inputMessage.value = '';
    // 滚动到消息列表底部
    scrollToBottom();
  }
};

// 滚动到消息列表底部的方法
const scrollToBottom = () => {
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  }
};
</script>

<template>
  <div class="chat-container">
    <!-- 聊天消息显示区域 -->
    <div class="chat-messages" ref="messagesRef">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{ 'user-message': message.isUser, 'other-message':!message.isUser }"
      >
        <img :src="message.avatar" alt="Avatar" class="avatar" />
        <div class="message-content">
          {{ message.text }}
        </div>
      </div>
    </div>
    <!-- 消息输入区域 -->
    <div class="chat-input">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="输入消息..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.user-message {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 10px;
}

.other-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
}

.message-content {
  padding: 10px;
  border-radius: 8px;
}

.user-message .message-content {
  background-color: #007bff;
  color: white;
}

.other-message .message-content {
  background-color: #f0f0f0;
  color: #333;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.chat-input button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}
</style>