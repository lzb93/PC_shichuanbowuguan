<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const datas = ref({
  list: [],
  total: 0,
  page: 1,
  pageSize: 12
})
const searchText = ref('')
async function getData(page, pageSize = 12) {
  const { data, code, msg } = await digitalApi.getFamousList({ page, pageSize, title: searchText.value })
  if (code === 1) {
    datas.value.list = data.list 
    datas.value.total = data.total
    datas.value.page = page
    datas.value.pageSize = pageSize
    console.log(data, 'data')
  } else {
    console.log(data, msg)
  }
}
getData(1)
const handlePageChange = (page) => {
  getData(page)
}
const handleClick = (id) => {
  router.push(`/digitalSpace/collect/${id}`)
}
</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
      <div class="search-bg">
        <input type="text" placeholder="搜索典藏名称、关键词" v-model="searchText" @input="getData(1)" />
      </div>
    </div>

    <!-- 列表 -->
    <div class="container w1440">
      <div class="activity-list">
        <div class="activity-item" v-for="item in datas.list" :key="item.id">
          <div class="activity-item-left">
            <img :src="item.avatar" :alt="item.name" />
          </div>
          <div class="activity-item-right">
            <h3 class="title f28">{{ item.name }}<span class="f16 gray ml10">{{ item.intro }}</span></h3>
            <div class="f16 gray mt30">{{ item.content }}</div>
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
  position: absolute;
  /* color: #fff; */
  margin-left: 240px;
  margin-top: 40px;
}

.search-bg {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
}

.search-bg input {
  width: 100%;
  height: 56px;
  line-height: 56px;
  padding: 0px 15px;
  border: 1px solid #7F5B1C;
  border-radius: 28px;
  font-size: 16px;
}


.content {
  min-height: 500px;
  padding: 40px 0;
}

.container {
  padding: 40px 0 1px;
  margin: 60px auto;
  background: #fff;
}


.activity-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 40px;
}

.activity-item {
  display: flex;
  gap: 40px;
  padding:0 0 40px 0px;
  border-bottom: 1px solid #E2E8F0;
  transition: all 0.3s ease;
}


.activity-item-left {
  width: 266px;
  overflow: hidden;
}

.activity-item-left img {
  width: 266px;
  height: auto;
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

</style>
