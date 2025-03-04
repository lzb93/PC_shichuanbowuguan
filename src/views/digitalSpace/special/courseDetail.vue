<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as digitalApi from '@/api/digital'
import { useRoute } from 'vue-router'; 
import Vue3VideoPlay from 'vue3-video-play';
import "vue3-video-play/dist/style.css";
// vue3-video-play 引入报错的话需要去 node_modules/vue3-video-play/package.json 修改 "module": "./dist/index.mjs",
// https://www.npmjs.com/package/vue3-video-play
const route = useRoute();
const playerOptions = ref({
  width: "100%", //播放器高度
  height: "535px", //播放器高度
  color: "#ffffff", //主题色
  speed: false, //关闭进度条拖动
  title: "视频名称", //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
});
const videoRef = ref(null);
const datas = ref({ // 详情
  title: '',
  create_time: '',
  content: '',
  view_count: 0
})
const chapter = ref([]) // 章节

const commentText = ref('')
const comments = ref([])

const submitComment = () => {
  if (!commentText.value.trim()) {
    return
  }
  
  // 添加新评论
  comments.value.unshift({
    user_name: '当前用户',
    create_time: new Date().toLocaleString(),
    content: commentText.value,
  })
  
  // 清空输入框
  commentText.value = ''
}

const playVideo = (url) => {
  if (url) {
    playerOptions.value.src = url
  } else {
    console.log('报错提示')
  }
}

async function getDetail() { // 课程详情
  const { data, code, msg } = await digitalApi.courseDetailGw({id: route.params.id})
  if (code === 1) {
    datas.value = data
    playerOptions.value.title = data.name
    playerOptions.value.cover = data.cover
    // playerOptions.value.src = data.video_url
  } else {
    console.log(data, msg)
  }
}

async function getChapter() { // 课程章节
  const { data, code, msg } = await digitalApi.courseChapterGw({id: route.params.id})
  if (code === 1) {
    chapter.value = data
    if (data.length > 0 && data[0].section.length > 0) {
      playerOptions.value.src = data[0].section[0].video_url
    }
  } else {
    console.log(data, msg)
  }
}
async function getComment() { // 评论
  const { data, code, msg } = await digitalApi.courseCommentGw({page: 1, pageSize: 999, id: route.params.id})
  if (code === 1) {
    comments.value = data.list
  } else {
    console.log(data, msg)
  }
}
getChapter()
getComment()
getDetail()

</script>

<template>
  <div class="bg-f8">
    <div class="w1440 bg-fff" style="padding: 0 121px;">
      <SBreadcrumb class="breadcrumb-box" />
      <h4 class="f32 mt30 mb20">{{ datas.name }}</h4>
      <p class="f16 mb20 c999">课程类型:{{ datas.view_count }} 课程老师:{{ datas.view_count }} 播放量:{{ datas.play_back }}次 发布时间:{{ datas.create_time }}</p>
        
      <div class="video-box">
        <vue3-video-play class="video-player" ref="videoRef" v-bind="playerOptions"
          :poster="playerOptions.cover" />
        <div class="chapter-list">
          <h4 class="fw6 f18 mb20">共{{chapter.length}}章</h4>
          <ul v-for="(item, index) in chapter" :key="index">
            <P class="fw6 mb10">{{ item.title }}</P>
            <li class="pl5" v-for="(cItem, cIndex) in item.section" :key="cIndex" @click="playVideo(cItem.video_url)">
              <img class="bg-f8" :src="playerOptions.cover" width="100%" height="104px" alt="">
              <p>{{ cItem.title }}</p>
            </li>
          </ul>

        </div>
      </div>
      <div class="comment-box">
        <div class="mt30">
          <h2 class="f28 mb20">课程简介</h2>
          <div class="f20 c999" v-html="datas.introduction"></div>
        </div>

        <!-- 评论 -->
        <div class="mt30">
          <div class="f28 mb20">评论({{ comments.length }})</div>
          
          <!-- 评论输入框 -->
          <div class="comment-input">
            <div class="user-avatar">
              <img src="@/assets/img/other/collect/head2.png" alt="用户头像" />
            </div>
            <div class="input-wrapper">
              <input type="text" placeholder="评论在这里输入" v-model="commentText" />
              <button class="submit-btn" @click="submitComment">发送</button>
            </div>
          </div>

          <!-- 评论列表 -->
          <div class="comment-list">
            <div class="comment-item" v-for="(comment, index) in comments" :key="index">
              <div class="user-avatar">
                <img v-if="comment.user_avatar" :src="comment.user_avatar" alt="用户头像" />
                <img v-else src="@/assets/img/other/collect/head2.png" alt="用户头像" />
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">{{ comment.user_name }}</span>
                  <span class="comment-time">{{ comment.create_time }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </div>
          </div>
          <p class="f12 c999 mt60 tc">再怎么找也没有啦！</p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.bg-f8 {
  padding-bottom: 1px;
}

.banner-bg {
  position: relative;
}

.banner-bg img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.breadcrumb-box {
  /* color: #fff; */
  margin-left: 0px;
  margin-top: 16px;
}

.video-box {
  display: flex;
  gap: 40px;
}

.video-player {
  width: 951px;
  height: 535px;
}

.chapter-list {
  width: 228px;
  height: 535px;
  background: #fff;
  overflow-y: scroll;
}
.no-scrollbar::-webkit-scrollbar {
  display: block; /* Safari and Chrome */
}

.chapter-list ul {

}

.chapter-list ul li {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}

.chapter-list ul li img {
  border-radius: 2px;
  margin-bottom: 5px;
}

.content {
  min-height: 500px;
  padding: 40px 0;
}

.comment-box {
  width: 100%;
  background: #fff;
  padding-right: 237px;
  padding-bottom: 60px;
  margin-bottom: 20px;
}

.comment-input {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.input-wrapper {
  flex: 1;
  display: flex;
  gap: 15px;
}

.input-wrapper input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #E2E8F0;
  border-radius: 36px;
  font-size: 16px;
}

.submit-btn {
  padding: 0 30px;
  width: 120px;
  background: #E24021;
  color: white;
  border: none;
  border-radius: 36px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.username {
  font-size: 16px;
  color: #333;
}

.comment-time {
  font-size: 14px;
  color: #999;
}

.comment-text {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}
</style>
