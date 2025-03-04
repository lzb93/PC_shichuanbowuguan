<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as vAndAApi from '@/api/vAndA'
import { useRoute } from 'vue-router'; 
const route = useRoute();
const datas = ref({
  title: '',
  create_time: '',
  content: '',
  view_count: 0
})

async function getData() {
  const { data, code, msg } = await vAndAApi.getActivityInfoGw({id: route.params.id})
  if (code === 1) {
    datas.value = data
  } else {
    console.log(data, msg)
  }
}
getData()

</script>

<template>
  <div class="w1440">
    <SBreadcrumb class="breadcrumb-box" />
    <h4 class="tc f32 mt30 mb20">{{ datas.title }}</h4>
    <p class="tc f16 mb20 c999">发布时间：{{ datas.create_time }} 浏览次数：{{ datas.view_count }}次</p>
    <div class="activity-item">
      <div class="activity-item-left">
        <img :src="datas.images_url" :alt="datas.title" />
      </div>
      <div class="activity-item-right">
        <h3 class="title f26">{{ datas.title || '暂无标题' }}</h3>
        <p class="f20">类型：{{ datas.classify_name || '-' }}</p>
        <p class="f20">时间：{{ datas.activity_time_start || '-' }} ~ {{ datas.activity_time_end || '-' }}</p>
        <p class="f20">地址：{{ datas.activity_address || '-' }}</p>
        <p class="f20">{{ datas.activity_synopsis || '-' }}</p>
        <div class="status" :class="datas.status_name">{{ datas.status_name }}</div>
      </div>
    </div>
    <div class="content" v-html="datas.goods_content || '暂无内容~'"></div>
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
  /* position: absolute; */
  /* color: #fff; */
  /* margin-left: 40px; */
  margin-top: 20px;
}

.content {
  min-height: 500px;
  padding: 40px 0;
}


.activity-item {
  display: flex;
  gap: 30px;
  height: 360px;
  background: #fff;
  border: 1px solid #e5e5e5;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.activity-item-left {
  width: 360px;
  height: 360px;
  overflow: hidden;
}

.activity-item-left img {
  width: 360px;
  height: 360px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.activity-item:hover .activity-item-left img {
  transform: scale(1.05);
}

.activity-item-right {
  flex: 1;
  position: relative;
  padding: 40px 0;
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
  margin-top: 20px;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 4px;
  font-size: 14px;
}

.status.待报名 {
  color: #fff;
  background: #616161;
}

.status.预约中 {
  color: #fff;
  background: #658A98;
}

.status.待开始 {
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

</style>
