<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
import * as mediaApi from '@/api/media'
import { useRouter } from 'vue-router';
const router = useRouter();
const datas = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 10
})

async function getData(page, pageSize = 10) {
  const { data, code, msg } = await mediaApi.getNoticeList({ page, pageSize })
  if (code === 1) {
    datas.value.data = data.list 
    datas.value.total = data.total
    datas.value.page = page
    datas.value.pageSize = pageSize
  } else {
    console.log(data, msg)
  }
}
getData(1)
const handlePageChange = (page) => {
  getData(page)
}
const handleClick = (id) => {
  router.push(`/digitalSpace/special/journal/${id}`)
}
</script>

<template>
  <div>
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">公告</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    <div class="notice-container w1440">
      <div class="notice-list">
        <div class="notice-item" v-for="(item, index) in datas.data" :key="index" @click="handleClick(item.id)">
          <p class="notice-title">{{ item.title }}</p>
          <p class="notice-desc">[{{ item.create_time }}]</p>
        </div>
      </div>
      <SPagination :currentPage="datas.page" :pageSize="datas.pageSize" :total="datas.total" @page-change="handlePageChange" />
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

.notice-container {
  padding: 40px 0;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-item {
  background: url('@/assets/img/other/dianxian.png') no-repeat center center;
  background-repeat: repeat-x;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.notice-img img {
  position: absolute;
  margin: auto;
}

.notice-info {
  padding: 20px 35px;
}

.notice-title {
  background: #fff;
  padding: 10px 20px;
  font-size: 18px;
  color: #333;
}

.notice-title::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 0px;
  margin-right: 10px;
  background: #D9D9D9;
  border-radius: 50%;
}

.notice-title:hover {
  color: #658A98;
  font-weight: bold;
  font-size: 20px;
}

.notice-title:hover::before{
  background: #658A98;
}

.notice-desc {
  font-size: 16px;
  padding: 10px 20px;
  color: #333;
  line-height: 25px;
  background: #fff;
}

</style>
