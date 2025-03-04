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
      <div class="assistant-info">
        <div class="assistant-avatar">
          <img src="@/assets/img/other/collect/head2.png" alt="助手头像" />
        </div>
        <div class="assistant-name">
          <h3>知识助手·小莉</h3>
          <p>您可向我咨询您想要知道的知识，我会毫无保留的与您分享。</p>
        </div>
      </div>
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
      <div class="chat-input-box">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage"><img style="margin-right: 5px;" src="@/assets/img/other/collect/icon2.png" width="24" height="24" />发送</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  background: rgba(255,255,255,0.8);
  box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.25);
  border-radius: 2px 2px 2px 2px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

/* 头部 */

.assistant-info {
  display: flex;
  align-items: center;
  gap: 20px;
  width: auto;
  margin: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.assistant-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.assistant-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.assistant-name h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  font-weight: normal;
}

.assistant-name p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

/* 聊天区 */

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
  padding: 30px;
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
  background: #EDF5F8;
  border-radius: 8px 8px 8px 8px;
}

.other-message .message-content {
  background-color: #f0f0f0;
  color: #333;
}

.chat-input {
  display: flex;
  padding: 10px;
  margin: 0 30px;
  border-top: 1px solid #ccc;
}

.chat-input-box {
  display: flex;
  align-items: center;
  width: 800px;
  height: 64px;
  margin: 30px auto;
  border-radius: 32px;
  border: 1px solid #5A715F;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: none;
  height: 48px;
  border-radius: 4px;
  margin: 0 20px;
  font-size: 16px;
}

.chat-input button {
  width: 120px;
  text-align: center;
  height: 64px;
  background: #5A715F;
  border: none;
  border-radius: 0px 35px 35px 0px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  box-shadow: none;
}

.chat-input button:hover {
  opacity: 0.8;
}
</style>