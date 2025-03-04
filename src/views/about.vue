<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import * as mediaApi from '@/api/media'

const datas = ref({})

async function getData() {
  const { data, code, msg } = await mediaApi.getScenicIntroduce()
  if (code === 1) {
    datas.value = data.content
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
      <h2 class="banner-title">关于四川名人馆</h2>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    
    <div class="w1440">
      <div class="content" v-html="datas"></div>
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
  margin-top: 40px;
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
