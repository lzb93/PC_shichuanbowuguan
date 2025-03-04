<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as digitalApi from '@/api/digital'
import { useRoute } from 'vue-router'; 
const route = useRoute();
const datas = ref({
  title: '',
  create_time: '',
  content: '',
  view_count: 0
})

async function getData() {
  const { data, code, msg } = await digitalApi.getJournalDetail({id: route.params.id})
  if (code === 1) {
    datas.value = data
  } else {
    console.log(data, msg)
  }
}
getData()

</script>

<template>
  <div class="bg-f8" style="padding-top: 1px;">
    <div class=" w1440 bg-fff" style=" margin: 2px auto;">
      <SBreadcrumb class="breadcrumb-box" />
      <h4 class="tc f32 mt30 mb20">{{ datas.title }}</h4>
      <p class="tc f16 mb20 c999">发布时间：{{ datas.create_time }} 浏览次数：{{ datas.view_count }}次</p>
      <div class="content" v-html="datas.content"></div>
    </div>
  </div>
</template>

<style scoped>
.banner-bg {
  position: relative;
}

.banner-bg img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.breadcrumb-box {
  position: relative;
  margin-left: 120px;
  padding-top: 20px;
  margin-bottom: 40px;
}

.content {
  min-height: 500px;
  padding: 40px 120px;
}

</style>
