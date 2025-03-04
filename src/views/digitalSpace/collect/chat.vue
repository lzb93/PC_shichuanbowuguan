<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SChatUI from '@/components/SChatUI.vue'
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
  const { data, code, msg } = await digitalApi.getNewsList({ page, pageSize })
  if (code === 1) {
    datas.value.data = data.data 
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
  router.push(`/mediaCenter/messaget/${id}`)
}
</script>

<template>
  <div class="bg-f8">
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <h1 class="banner-title">知识问答</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    <div class="container">
      <SChatUI class="chat-ui" />
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

.container {
  min-height: 1080px;
  padding: 40px 0;
  background: url('@/assets/img/other/bg2.png') no-repeat;
  background-size: 100% 100%;
}

.chat-ui {
  width: 1200px;
  height: 851px;
  margin: 54px auto;
  background: #fff;
}


</style>
