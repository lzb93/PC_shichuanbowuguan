<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const datas = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 12
})

async function getData(page, pageSize = 12) {
  const { data, code, msg } = await digitalApi.getResearchList({ page, pageSize })
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
  router.push(`/digitalSpace/special/study/${id}`)
}
</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">研究</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    <div class="news-container w1440">
      <div class="news-grid">
        <div class="news-item" v-for="(item, index) in datas.data" :key="index" @click="handleClick(item.id)">
          <div class="news-img">
            <img :src="item.cover_image" :alt="item.title" />
          </div>
          <div class="news-info">
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-desc">{{ item.intro }}</p>
          </div>
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

.news-container {
  padding: 40px 0;
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

</style>
