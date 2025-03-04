<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
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
  const { data, code, msg } = await digitalApi.getCollectionDetail({id: route.params.id})
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
      <Carousel class="banner-one" v-bind="{ itemsToShow: 1, wrapAround: true }">
        <Slide v-for="(slide, index) in datas.images" :key="index">
          <img class="banner-one" :src="slide" width="100vw" />
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>

    <!-- 列表 -->
    
    <div class="w1440">
      <SBreadcrumb class="mt20" />
      <h4 class="f32 mt30 mb20">{{ datas.title }}</h4>
      <p class="f20 mb20">类别: {{ datas.category_name }}</p>
      <p class="f20 mb20">年代: {{ datas.dynasty }}</p>
      <p class="f20 mb20">尺寸: {{ datas.dimension }}</p>
      <p class="f20 mb20">质地: {{ datas.texture }}</p>
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

.content {
  min-height: 500px;
  padding: 40px 0;
}

</style>
