<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as mediaApi from '@/api/media'
import { useRoute } from 'vue-router'; 
const route = useRoute();
const datas = ref({
  title: '',
  create_time: '',
  content: '',
  view_count: 0
})

async function getData() {
  const { data, code, msg } = await mediaApi.getNoticeDetail({id: route.params.id})
  if (code === 1) {
    datas.value = data
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
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    
    <div class="w1440">
      <h4 class="tc f32 mt30 mb20">{{ datas.title }}</h4>
      <p class="tc f16 mb20 c999">发布时间：{{ datas.create_time }} 浏览次数：{{ datas.view_count }}次</p>
      <div class="content" v-html="datas.content"></div>
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
  margin-left: 240px;
  margin-top: 40px;
}

.content {
  min-height: 500px;
  padding: 40px 0;
}

</style>
