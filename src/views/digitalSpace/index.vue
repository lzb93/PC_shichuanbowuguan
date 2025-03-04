<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SPagination from '@/components/SPagination.vue'
import STabs from '@/components/STabs.vue'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const category = ref([])
const datas = ref({
  data: [],
  total: 0,
  page: 1,
  pageSize: 12
})

async function getCategory() {
  const { data, code, msg } = await digitalApi.getCultureCategory()
  if (code === 1) {
    data.map(e=>{
      if (e.children && e.children.length > 0) {
        e.children.unshift({
          id: e.id,
          name: e.name
        })
      }
    })
    category.value = data
    getData(1)
  } else {
    console.log(data, msg)
  }
}

async function getData(page, pageSize = 12, categoryId) {
  const { data, code, msg } = await digitalApi.getCultureList({ page, pageSize, categoryId })
  if (code === 1) {
    datas.value.list = data.list 
    datas.value.total = data.total
    datas.value.page = page
    datas.value.pageSize = pageSize
  } else {
    console.log(data, msg)
  }
}
getCategory()

const handlePageChange = (page) => {
  getData(page)
}

const handleClick = (id) => {
  router.push(`/digitalSpace/index/${id}`)
}

const handleSollChange = (id) => {
  getData(1, 12, id)
}

</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">文创</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
      <STabs ref="childRef" class="tabs-top" :isBlack="true" :titleKey="'name'" :childKey="'children'" :list="category" @change="handleSollChange" />
    </div>

    <!-- 列表 -->
    <div class="news-container w1440">
      <div class="activity-list">
        <div class="activity-item" v-for="item in datas.list" :key="item.id" @click="handleClick(item.id)">
          <div class="activity-item-left">
            <img src="@/assets/img/home/banner1.png" alt="活动图片" />
          </div>
          <div class="activity-item-right">
            <h3 class="title f26">{{ item.goods_name || '暂无标题' }}</h3>
            <p class="f20">材质：{{ item.keywords || '-' }}</p>
            <p class="f20">描述：{{ item.goods_remark || '-' }}</p>
            <p class="f20">价格：￥{{ item.shop_price || '-' }}</p>
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
  top: 20px;
}

.banner-title {
  position: absolute;
  left: 40px;
  top: 80px;
  color: #E24021;
  font-size: 56px;
  font-weight: bold;
}

.tabs-top{
  position: absolute;
  bottom: 20px;
  left: 50px;
  z-index: 100;
}

.content {
  min-height: 500px;
  padding: 40px 0;
}

.news-container {
  padding: 40px 0;
}


.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 30px;
  height: 360px;
  background: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
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

</style>
