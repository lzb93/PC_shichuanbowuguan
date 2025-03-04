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
  const { data, code, msg } = await vAndAApi.getExhibitionDetail({id: route.params.id})
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

</style>
