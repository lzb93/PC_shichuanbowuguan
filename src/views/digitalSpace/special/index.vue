<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const datas = ref({
  data: [],
})
const obj = ref({
  research: [],
  journal: []
})

async function getData() {
  const { data, code, msg } = await digitalApi.getSpecial({})
  if (code === 1) {
    obj.value.research = data.research
    obj.value.journal = data.journal 
  } else {
    console.log(data, msg)
  }
}

async function getCourseListSpecial() {
  const { data, code, msg } = await digitalApi.courseListSpecial({})
  if (code === 1) {
    datas.value.data = data
  } else {
    console.log(data, msg)
  }
}

getData(1)
getCourseListSpecial();
const handleClick = (url) => {
  router.push(url)
}
</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">专题</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- top -->
    <div class="w90z">
      <h4 class="f32 red tc mt60 mb20 fw6">云端展览</h4>
      <img src="@/assets/img/other/collect/banner4.png" width="100%" alt="banner" />
      <div class="banner-btn" @click="handleClick(`/digitalSpace/special/exhibition`)">
        <p class="f32 tc">进入导览</p>
        <img src="@/assets/img/other/btn.png" width="330px" height="91px"  />
      </div>
    </div>

    <!-- 列表 -->
    <div class="news-container w1440">
      <h4 class="f32 red tc mt60 mb20 fw6">云端课程</h4>
      <div class="news-grid">
        <div class="news-item" v-for="(item, index) in datas.data" :key="index" @click="handleClick(`/digitalSpace/special/course/${item.id}`)">
          <div class="news-img">
            <img :src="item.cover" alt="新闻图片" />
          </div>
          <div class="news-info">
            <h3 class="news-title">{{ item.name }}</h3>
            <p class="news-desc">{{ item.introduction }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表2 -->
    <div class="list-section w1440">
      <!-- 研究列表 -->
      <div class="list-box">
        <div class="list-header">
          <h2 class="title">研究</h2>
          <span class="more" @click="handleClick(`/digitalSpace/special/study`)">查看更多</span>
        </div>
        <div class="list-items">
          <div class="list-item" v-for="(item, index) in obj.research" :key="index" @click="handleClick(`/digitalSpace/special/study/${item.id}`)">
            <div class="item-content">
              <h3>{{item.title}}</h3>
              <p>{{item.intro}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 馆刊列表 -->
      <div class="list-box">
          <div class="list-header">
            <h2 class="title">馆刊</h2>
            <span class="more" @click="handleClick('/digitalSpace/special/journal')">查看更多</span>
          </div>
          <div class="list-items">
            <div class="list-item" v-for="(item, index) in obj.journal" :key="index" @click="handleClick(`/digitalSpace/special/journal/${item.id}`)">
              <div class="item-content">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
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

.news-container {
  padding: 40px 0 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.news-item {
  background: #fff;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.news-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.news-img {
  width: 100%;
  height: 290px;
  overflow: hidden;
  cursor: pointer;
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


/* 列表2 */

/* 研究和馆刊列表样式 */
.list-section {
  display: flex;
  gap: 16px;
  padding-bottom: 150px;
}

.list-box {
  flex: 1;
  background: #fff;
  border-radius: 2px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  border-bottom: 1px solid #DBDBDB;
}

.list-header .title {
  font-size: 32px;
  color: #E24021;
  font-weight: bold;
}

.list-header .more {
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.list-header .more:hover {
  color: #E24021;
}

.list-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.list-item:hover {
  transform: translateX(10px);
}

.item-content {
  padding: 20px;
}

.item-content h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: normal;
}
.item-content h3::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 0px;
  margin-right: 10px;
  background: #D9D9D9;
  border-radius: 50%;
}

.item-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  padding-left: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
