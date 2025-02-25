<script setup>
import { ref, onMounted } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
const navItems = ref([
  { id: 'ticket', title: '票务信息' },
  { id: 'location', title: '位置及交通' },
  { id: 'notice', title: '入馆提示' },
  { id: 'store', title: '文创商店' }
])

const list = ref([
  { id: '1', title: '这边显示活动名称', type: '活动', time: '2025-01-01', address: '成都博物馆', content: '这边显示活动内容', status: '预约中' },
  { id: '2', title: '这边显示活动名称', type: '活动', time: '2025-01-01', address: '成都博物馆', content: '这边显示活动内容', status: '进行中'  },
  { id: '3', title: '这边显示活动名称', type: '活动', time: '2025-01-01', address: '成都博物馆', content: '这边显示活动内容', status: '已结束' },
  { id: '4', title: '这边显示活动名称', type: '活动', time: '2025-01-01', address: '成都博物馆', content: '这边显示活动内容', status: '已结束' }
])

const handlePageChange = (page) => {
  console.log(page)
}
</script>

<template>
  <div class="">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <img src="@/assets/img/other/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    
    <div class="activity-container w1440">
      <div class="activity-list">
        <div class="activity-item" v-for="item in list" :key="item.id">
          <div class="activity-item-left">
            <img src="@/assets/img/home/banner1.png" alt="活动图片" />
          </div>
          <div class="activity-item-right">
            <h3 class="title">{{ item.title }}</h3>
            <div class="info">
              <div class="info-item">
                <span class="label">类型：</span>
                <span class="value">{{ item.type }}</span>
              </div>
              <div class="info-item">
                <span class="label">时间：</span>
                <span class="value">{{ item.time }}</span>
              </div>
              <div class="info-item">
                <span class="label">地址：</span>
                <span class="value">{{ item.address }}</span>
              </div>
              <div class="info-item">
                <span class="label">内容：</span>
                <span class="value">{{ item.content }}</span>
              </div>
            </div>
            <div class="status" :class="item.status">{{ item.status }}</div>
          </div>
        </div>
      </div>
      <SPagination @page-change="handlePageChange" />
    </div>
  </div>
</template>

<style scoped>
.visit-guide {

}
.banner-bg {
  position: relative;
}
.breadcrumb-box {
  position: absolute;
  color: #fff;
  margin-left: 240px;
  margin-top: 40px;
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
  gap: 30px;
  padding: 20px;
  background: #fff;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.activity-item-left {
  width: 300px;
  height: 200px;
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
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.label {
  color: #999;
  width: 70px;
}

.value {
  color: #666;
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

.status.预约中 {
  color: #fff;
  background: #658A98;
}

.status.进行中 {
  color: #fff;
  background: #4CAF50;
}

.status.已结束 {
  color: #fff;
  background: #999;
}

.banner-bg img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
