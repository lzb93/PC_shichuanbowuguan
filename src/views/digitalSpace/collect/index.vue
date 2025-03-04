<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const datas = ref({
  collection: [],
  famous: []
})
async function getData() {
  const { data, code, msg } = await digitalApi.getCollectionCategory({})
  if (code === 1) {
    datas.value.collection = data.collection 
    datas.value.famous = data.famous
    console.log(data, 'data')
  } else {
    console.log(data, msg)
  }
}
getData(1)
const handlePageChange = (page) => {
  getData(page)
}
const handleClick = (url) => {
  router.push(url)
}
</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">典藏</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <div class="container">
      <!-- 列表 -->
      <h2 class="f32 red tc mt60 mb20 fw6">展项数字化</h2>
      <div class="news-grid">
        <div class="news-item" v-for="(item, index) in datas.collection" :key="index" @click="handleClick(`/digitalSpace/collect/${item.id}`)">
          <div class="news-img">
            <img :src="item.domain_image" :alt="item.title" />
          </div>
          <div class="news-info">
            <h3 class="news-title tc">{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <!-- 模块二 -->
      <div class="knowledge-section">
        <!-- 知识图谱 -->
        <div class="map-content">
          <div class="map-image">
            <img src="@/assets/img/other/collect/banner1.png" alt="背景" class="map-bg" />
            <div class="lantern-grid">
              <div v-for="(item, index) in 9" :key="index" 
                   class="lantern-item"
                   :class="{ 'active': index === 4 }"
                   @click="handleClick('/digitalSpace/collect/database')">
                <img src="@/assets/img/other/collect/head.png" />
                <span class="lantern-text">杜甫杜甫</span>
              </div>
            </div>
            <div class="lantern-grid">
              <div v-for="(item, index) in 19" :key="index" class="lantern-item" @click="handleClick('/digitalSpace/collect/database')">
                <img src="@/assets/img/other/collect/head.png" alt="灯笼" />
                <span class="lantern-text">杜甫杜甫</span>
              </div>
            </div>
            <div class="banner-btn" style="bottom: 180px;" @click="handleClick('/digitalSpace/collect/database')">
              <p class="f32 tc">点击查看</p>
              <img src="@/assets/img/other/btn.png" width="330px" height="91px" />
            </div>
            <!-- <div class="check-btn"></div> -->
          </div>
        </div>

        <!-- 知识图谱  -->
        <div class="w90z">
          <h4 class="f32 red tc mt60 mb20 fw6">知识图谱</h4>
          <img src="@/assets/img/other/collect/banner3.png" width="100%" alt="banner" />
          <div class="banner-btn">
            <p class="f32 tc">进入知识图谱</p>
            <img src="@/assets/img/other/btn.png" width="330px" height="91px" />
          </div>
        </div>

        <!-- 知识助手 -->
        <div class="knowledge-assistant w1440" @click="handleClick('/digitalSpace/collect/chat')">
          <h4 class="f32 red tc mt60 mb20 fw6">知识助手</h4>
          <div class="assistant-content">
            <div class="assistant-info">
              <div class="assistant-avatar">
                <img src="@/assets/img/other/collect/head2.png" alt="助手头像" />
              </div>
              <div class="assistant-name">
                <h3>知识助手·小莉</h3>
                <p>您可向我咨询您想要知道的知识，我会毫无保留的与您分享。</p>
              </div>
            </div>
            <div class="assistant-input">
              <input type="text" placeholder="请输入您想咨询的问题" />
              <button class="send-btn"><img style="margin-right: 5px;" src="@/assets/img/other/collect/icon2.png" width="24" height="24" />发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-f8 {
  background: #f8f8f8;

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
  position: absolute;
  /* color: #fff; */
  margin-left: 40px;
  bottom: 20px;
}

.banner-title {
  position: absolute;
  left: 40px;
  top: 80px;
  color: #E24021;
  font-size: 56px;
  font-weight: bold;
}


.content {
  min-height: 500px;
  padding: 40px 0;
}

.container {
  padding: 40px 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  padding: 0 60px;
}

.news-item {
  /* background: #fff; */
  /* border: 1px solid #E2E8F0; */
  transition: all 0.3s ease;
  overflow: hidden;
}

.news-img {
  width: 100%;
  height: 290px;
  overflow: hidden;
  cursor: pointer;
}

.news-img:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-item:hover .news-img img {
  transform: scale(1.05);
}

.news-info {
  padding: 20px 35px;
}

.news-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-desc {
  font-size: 16px;
  color: #666;
  line-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.knowledge-section {
  margin-top: 60px;
}

.section-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.banner-btn{
  position: absolute;
  left: 50%;
  margin-left: -165px;
  margin-top: -120px;
}
.banner-btn p{
  position: absolute;
  color: #77620E;
  line-height: 91px;
  width: 330px;
  cursor: pointer;
}

/* 知识图谱样式 */
.map-content {
  position: relative;
  margin-bottom: 60px;
}

.map-image {
  position: relative;
  width: 100vw;
  height: 1080px;
  background: #F6F3E9;

}

.map-bg {
  position: absolute;
  width: 100vw;
  height: 1080px;
  /* object-fit: cover; */
  opacity: 0.6;
}

.lantern-grid {
  gap: 20px;
  padding: 20px 50px;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.lantern-item {
  cursor: pointer;
  transition: all 0.3s ease;
  background: url('@/assets/img/other/collect/bg.png') no-repeat;
  background-size: 100% 100%;
  transform: scale(0.8);
  filter: opacity(0.6);
  width: 157px;
  height: 341px;
  text-align: center;
}
.lantern-item span {
  width: 24px;
  color: #795710;
  font-weight: 600;
  font-size: 28px;
  margin: -45px auto;
  display: block;
  text-align: center;
}

.lantern-item img {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin: 55px 40px;
  object-fit: contain;
  /* opacity: 0.6; */
}

.lantern-item.active {
  transform: scale(1);
  filter: opacity(1);
  /* filter: brightness(1.2); */
}

.lantern-text {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.check-btn {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 30px;
  background: linear-gradient(180deg, #F6E6A6 0%, #EED578 100%);
  border-radius: 20px;
  color: #8B6D27;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.check-btn:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 5px 15px rgba(238, 213, 120, 0.3);
}

/* 知识助手样式 */
.knowledge-assistant {
  margin-top: 60px;
}

.assistant-content {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.assistant-info {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 500px;
  margin: 0 auto 30px;
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

.assistant-input {
  display: flex;
  gap: 15px;
}

.assistant-input input {
  flex: 1;
  height: 44px;
  padding: 0 20px;
  border: 1px solid #E2E8F0;
  border-radius: 22px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.assistant-input input:focus {
  border-color: #5A715F;
}

.assistant-input input::placeholder {
  color: #999;
}

.send-btn {
  padding: 0 30px;
  height: 44px;
  background: #5A715F;
  color: white;
  border: none;
  border-radius: 22px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
