<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as mediaApi from '@/api/media'

const list = ref([])

async function getData() {
  const { data, code, msg } = await mediaApi.getMediaMatrixList()
  if (code === 1) {
    list.value = data.list
  } else {
    console.log(data, msg)
  }
}
getData()

</script>

<template>
  <div>
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h2 class="banner-title">媒体矩阵</h2>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    
    <div class="activity-container w1440">
      <div class="activity-list">
        <div class="activity-item" v-for="item in list" :key="item.id">
          <div class="activity-item-left">
            <img :src="item.qrcode" :alt="item.title" />
          </div>
          <div class="activity-item-right">
            <h3 class="title"><img :src="item.icon" width="40" height="40" :alt="item.title" />{{ item.title }}</h3>
            <div class="info">
              <div class="info-item">
                <span class="value">{{ item.intro }}</span>
              </div>
              <div class="info-item">
                <!-- <span class="label">描述：</span> -->
                <span class="value">{{ item.content }}</span>
              </div>
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
.tabs-top{
  position: absolute;
  bottom: 20px;
  left: 50px;
  z-index: 100;
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
.activity-container {
  padding: 40px 0;
  margin: 0 auto;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 40px;
  height: 280px;
  background: #fff;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.activity-item-left {
  width: 240px;
  height: 240px;
  margin: 20px;
  overflow: hidden;
}

.activity-item-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.activity-item:hover .activity-item-left img {
  transform: scale(1.05);
}

.activity-item-right {
  flex: 1;
  position: relative;
  padding: 10px 0;
}

.title {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
}

.title img{
  margin-right: 20px;
  vertical-align: bottom;
  border-radius: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
}

.label {
  width: 70px;
}

.value {
  flex: 1;
}

.status {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 14px;
}

.banner-bg img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
