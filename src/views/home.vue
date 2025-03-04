<script setup>
import { ref, onMounted } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { Navigation as CarouselNavigation } from 'vue3-carousel'
import SImg from '../components/SImg.vue'
import SMoreBotton from '../components/SMoreBotton.vue'
import SVisualAnimation from '../components/SVisualAnimation.vue'
import * as homeApi from '@/api/home'
import * as digitalApi from '@/api/digital'
import { useRouter } from 'vue-router';
const router = useRouter();
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
}
const carouselConfig2 = {
  itemsToShow: 4,
  wrapAround: true
}

const bannerList = ref([])

const trafficObj = ref({
  openTime: '',
  traffic: [
    {
      id: 1,
      name: '火车', 
      text: '111T21路、T40路、T1路、T40路快线、T150路等',
      img: '../assets/img/icon/ce1.png'
    },
    {
      id: 2,
      name: '地铁', 
      text: '222T21路、T40路、T1路、T40路快线、T150路等',
      img: '../assets/img/icon/ce2.png'
    },
    {
      id: 3,
      name: '汽车', 
      text: '333T21路、T40路、T1路、T40路快线、T150路等',
      img: '../assets/img/icon/ce3.png'
    },
  ]
})

const cultureList = ref([])

const newsList = ref([])

const activityObj = ref({})

const specialExhibitionList = ref([])

const trafficText = ref('')
const showTraffic = (item) => {
  trafficText.value = item
}

async function getData() {
  const { data, code, msg } = await homeApi.getBannerList()
  if (code === 1) {
    bannerList.value = data.list
    console.log(data, 'data')
  } else {
    console.log(msg)
  }
}
async function getOpenTimeAndTraffic() {
  const { data, code, msg } = await homeApi.getOpenTimeAndTraffic()
  if (code === 1) {
    trafficObj.value = data
    trafficObj.value.traffic = data.traffic.map(item => ({
      type: item.type,
      value: item.value,
      img: item.type === '地铁' ? '../assets/img/icon/ce1.png' :  item.type === '公交' ? '../assets/img/icon/ce3.png' : '../assets/img/icon/ce2.png'
    }))
    console.log(trafficObj.value, 'trafficObj')
    trafficText.value = data.traffic[0].value
  } else {
    console.log(msg)
  }
}

async function getNewsListIndex() {
  const { data, code, msg } = await homeApi.getNewsListIndex()
  if (code === 1) {
    newsList.value = data
  } else {
    console.log(msg)
  }
}

async function getActivityIndex() {
  const { data, code, msg } = await homeApi.getActivityIndex()
  if (code === 1) {
    activityObj.value = data
  } else {
    console.log(msg)
  }
}

async function getSpecialExhibition() {
  const { data, code, msg } = await homeApi.getSpecialExhibition()
  if (code === 1) {
    specialExhibitionList.value = data
  } else {
    console.log(msg)
  }
}

async function getCultureList() {
  const { data, code, msg } = await digitalApi.getCultureList()
  if (code === 1) {
    data.list.length = 3
    cultureList.value = data.list
  } else {
    console.log(msg)
  }
}

getData()
getOpenTimeAndTraffic()
getCultureList()
getNewsListIndex()
getActivityIndex()
getSpecialExhibition()

const handleClick = (url) => {
  router.push(url)
}


</script>

<template>
  <main>
    <!-- 顶部 -->
    <!-- 1 -->
    <Carousel class="banner-one" v-bind="carouselConfig">
      <Slide v-for="slide in bannerList" :key="slide">
        <img :alt="slide.remark" class="banner-one" :src="slide.domain_image" width="100vw" height="100vh" />
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
    <!-- 2 -->
    <div class="bgf9">
      <div class="x-bc w1390 tc pt64">
        <div>
          <h4 class="f32 mb20">开放时间</h4>
          <p class="f32 mb10"><SImg style="margin: -5px 10px;vertical-align: baseline;" src="../assets/img/icon/time.png" width="30" height="30" />{{ trafficObj.openTime.open_start_time }} - {{ trafficObj.openTime.open_end_time }}</p>
          <p class="f18 mb10">{{ trafficObj.openTime.open_time }}</p>
          <p class="f18"><img class="mr5" style="vertical-align: baseline;" src="@/assets/img/icon/address.png" width="16" height="16" />四川省成都市天府新区雅州路2936号</p>
        </div>
        <div class="traffic-right">
          <h4 class="f32 mb20">交通路线</h4>
          <div class="x-bc">  
            <div class="derlineBlack" v-for="item in trafficObj.traffic" :key="item.id"><SImg :src="item.img" width="80" height="80"  @mouseenter="showTraffic(item.value)" /></div>
          </div>
          <p class="f18 mt30" v-html="trafficText"></p>
        </div>
      </div>
      <div class="tc mt40"><SMoreBotton class="mb35" /></div>
    </div>
    <!-- 3 -->
    <SVisualAnimation animation="animate__fadeInDown" class="store-section w1390">
      <h2 class="tc f36">文创商店</h2>
      
      <div class="store-grid">
        <div class="store-item" v-for="item in cultureList" :key="item.id" @click="handleClick(`/digitalSpace/index/${item.id}`)">
          <div class="store-img">
            <img :src="item.original_img" :alt="item.goods_name" />
          </div>
          <div class="store-info">
            <h3 class="f24">{{item.goods_name}}</h3>
            <p class="f16">{{ item.goods_remark }}</p>
          </div>
        </div>
      </div>

      <div class="tc mt30">
        <SMoreBotton @click="handleClick(`/digitalSpace/index`)" />
      </div>
    </SVisualAnimation>

    <!-- 4 -->
    <div ref="targetElement" class="exhibition-section ">
      <h2 class="tc f36">常设展览</h2>

      <img class="mt40" src="@/assets/img/home/banner32.png" width="100%" alt="常设展览" />
      <div class="exhibition-content">
        <!-- 左侧图片 -->
        <div class="exhibition-image">
          <img class="cp" src="@/assets/img/home/banner4.png" alt="常设展览" @click="handleClick(`/digitalSpace/index`)" />
        </div>
        
        <!-- 右侧信息 -->
        <div class="exhibition-info">
          <div class="info-list">
            <div class="list-head display-flex-be mb20">
              <h3>资讯/公告</h3>
              <SMoreBotton style="color: #333; background: #fff;" @click="handleClick(`/mediaCenter`)" />
            </div>
            <div class="list-item" v-for="item in newsList" :key="item.id" @click="handleClick(`/mediaCenter/messaget/${item.id}`)">
              <span class="date">【展览时间】</span>
              <span class="content">{{ item.title }}</span>
              <span class="time">[{{ item.create_time }}]</span>
            </div>
          </div>

          <div class="info-item">
            <div class="list-head display-flex-be">
              <h3>教育活动</h3>
              <SMoreBotton style="color: #333; background: #fff;" />
            </div>
            <div class="jyhd-box display-flex-be f18">
              <img height="200px" src="@/assets/img/home/banner4.png">
              <div class="jyhd-item">
                <h4 class="f24 ellipsis-1">{{activityObj.title}}</h4>
                <p class="mt10 ellipsis-1">{{activityObj.activity_synopsis}}</p>
                <p class="ellipsis-1">时间地点：{{ activityObj.activity_address }} / {{activityObj.activity_time_start}} 至 {{activityObj.activity_time_start}}</p>
                <div class="display-flex-be mt60">
                  <p class="ml10">￥{{activityObj.sign_price}}</p>
                  <SMoreBotton title="立即报名" style="color: #333; background: #fff;" @click="handleClick(`/visitsAndActivities/activitie/${activityObj.id}`)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5 -->
    <SVisualAnimation animation="animate__fadeInDown"  class="special-exhibition">
      <h2 class="tc f36">特别展览</h2>
      
      <Carousel v-bind="{ ...carouselConfig2, gap: 16, autoplay: 3000, snapAlign: 'start' }" class="special-carousel">
        <Slide v-for="slide in specialExhibitionList" :key="slide" @click="handleClick(`/visitsAndActivities/visits/${slide.id}`)">
          <div class="special-item">
            <img :src="slide.domain_image" :alt="slide.title" />
            <div class="special-info">
              <h3>{{slide.title}}</h3>
              <p>{{slide.period}}</p>
              <p>{{slide.hall}}</p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <CarouselNavigation>
            <template #prev>
              <span class="nav-button" style="margin-left: -100px;">&#8249;</span>
            </template>
            <template #next>
              <span class="nav-button" style="margin-right: -100px;">&#8250;</span>
            </template>
          </CarouselNavigation>
        </template>
      </Carousel>

      <div class="tc mt30">
        <SMoreBotton />
      </div>
    </SVisualAnimation>

  </main>
</template>

<style scoped lang="scss">
.pt64{
  padding-top: 64px;
}
/* 轮播图样式1 */
.carousel {
  --vc-pgn-background-color: #00000020;
  --vc-pgn-active-color: #00000095;
  /* --vc-pgn-border-radius: 1px; */
  --vc-pgn-height: 10px;
  --vc-pgn-width: 64px;

  /* 轮播图样式2 */
  --vc-nav-background: rgba(0, 0, 0, 0);
  --vc-nav-color: #000000;
  --vc-nav-color-hover: #00000090;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 50px;
  --vc-nav-height: 80px;
}

.nav-button {
  /* transform: scale(0.8, 1.5); */
  font-family: Noto Sans Thin, Source Han Sans Thin;
  font-size: 80px;
  font-weight: 300;
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
}

.traffic-right {
  width: 600px;
}

.traffic-right .x-bc{
  width: 450px;
  margin: 0 auto;
}

main{
  box-sizing: border-box;
}
.banner-one{
  width: 100vw;
  height: 100vh;
}

.store-section {
  padding: 60px 0;
  margin: 0 auto;
}

.store-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.store-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.store-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.store-img {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.store-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.store-item:hover .store-img img {
  transform: scale(1.05);
}

.store-info {
  padding: 20px;
  background: rgba(255,255,255,0.9);
  text-align: center;
}

.mt30 {
  margin-top: 30px;
}

/* 4 */

.exhibition-section {
  padding: 60px 0 0;
  margin: 0 auto;
  background: #f5f5f5;
}

.exhibition-content {
  display: flex;
  /* gap: 50px; */
  align-items: center;
}

.exhibition-image {
  flex: 1;
  width: 50%;
  overflow: hidden;
}

.exhibition-image img {
  width: 100%;
  height: 590px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.exhibition-image:hover img {
  transform: scale(1.05);
}

.exhibition-info {
  flex: 1;

}

.info-item {
  /* margin-bottom: 30px; */
  padding: 20px;
  height: 295px;
  background: #56635B;
  color: #fff;
  .list-head{
    padding: 0 10px 10px 10px;
  }
}

.info-list {
  background: #B8976D;
  color: #fff;
  padding: 20px 30px;
  height: 295px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.list-item {
  display: flex;
  margin-bottom: 20px;
  line-height: 1.3;
  cursor: pointer;
}

.list-item:last-child {
  margin-bottom: 0;
}

.list-item .date {
  min-width: 100px;
  font-weight: 500;
}

.list-item .content {
  flex: 1;
}

.jyhd-box{
  background: #00000030;
  padding: 10px 20px;
  color: #fff;
}

.jyhd-item{
  flex: 1;
  margin-left: 10px;
}

/* 5 */

.special-exhibition {
  padding: 60px 0;
  background: #fff;
}

.special-carousel {
  margin: 40px 55px;
}

.special-item {
  position: relative;
  /* margin: 0 15px; */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.special-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.special-item img {
  width: 100%;
  height: 790px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.special-item:hover img {
  transform: scale(1.05);
}

.special-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(0,0,0,0.5);
  // background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  opacity: 0;
}

.special-item:hover .special-info {
  opacity: 1;
}

.special-info h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.special-info p {
  font-size: 16px;
  opacity: 0.9;
}

:deep(.carousel__slide) {
  padding: 1px;
}

:deep(.carousel__pagination) {
  margin-top: 20px;
}

:deep(.carousel__pagination-button::after) {
  width: 12px;
  height: 12px;
  background-color: #666;
}

:deep(.carousel__pagination-button--active::after) {
  background-color: #000;
}

</style>
