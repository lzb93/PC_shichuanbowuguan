<script setup>
import { ref, onMounted } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { Navigation as CarouselNavigation } from 'vue3-carousel'
import SImg from '../components/SImg.vue'
import SMoreBotton from '../components/SMoreBotton.vue'
import SVisualAnimation from '../components/SVisualAnimation.vue'
import { getBannerList } from '../api/home'
import * as homeApi from '@/api/home'

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
}
const carouselConfig2 = {
  itemsToShow: 4,
  wrapAround: true
}

const traffic = ref([
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
])

const trafficText = ref(traffic.value[0].text)
const showTraffic = (item) => {
  trafficText.value = item
}

async function getData() {
  const { data, success, message } = await homeApi.getBannerList()
  if (success) {
    console.log(data)
  } else {
    console.log(message)
  }
}
getData()


</script>

<template>
  <main>
    <!-- 顶部 -->
    <!-- 1 -->
    <Carousel class="banner-one" v-bind="carouselConfig">
      <Slide v-for="slide in 10" :key="slide">
        <img alt="四川名人馆" class="banner-one" src="@/assets/img/home/banner1.png" width="100vw" height="100vh" />
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
          <p class="f32 mb10"><SImg style="margin: -5px 10px;vertical-align: baseline;" src="../assets/img/icon/time.png" width="30" height="30" />10:00 - 17:00</p>
          <p class="f18 mb10">17:00后停止入场，基本陈列免预约，除国定节假日外，周一闭馆</p>
          <p class="f18"><img class="mr5" style="vertical-align: baseline;" src="@/assets/img/icon/address.png" width="16" height="16" />四川省成都市天府新区雅州路2936号</p>
        </div>
        <div>
          <h4 class="f32 mb20">交通路线</h4>
          <div class="x-bc">  
            <div class="derlineBlack" v-for="item in traffic" :key="item.id"><SImg :src="item.img" width="80" height="80"  @mouseenter="showTraffic(item.text)" /></div>
          </div>
          <p class="f18 mt30">{{trafficText}}</p>
        </div>
      </div>
      <div class="tc mt40"><SMoreBotton class="mb35" /></div>
    </div>
    <!-- 3 -->
    <SVisualAnimation animation="animate__fadeInDown" class="store-section w1390">
      <h2 class="tc f36">文创商店</h2>
      
      <div class="store-grid">
        <!-- 书籍区块 -->
        <div class="store-item">
          <div class="store-img">
            <img src="@/assets/img/home/banner3.png" alt="书籍" />
          </div>
          <div class="store-info">
            <h3 class="f24">书籍</h3>
            <p class="f16">精选历史文化典籍</p>
          </div>
        </div>

        <!-- 展览衍生品区块 -->
        <div class="store-item">
          <div class="store-img">
            <img src="@/assets/img/home/banner31.png" alt="展览衍生" />
          </div>
          <div class="store-info">
            <h3 class="f24">展览衍生</h3>
            <p class="f16">展览主题文创产品</p>
          </div>
        </div>

        <!-- IP衍生品区块 -->
        <div class="store-item">
          <div class="store-img">
            <img src="@/assets/img/home/banner32.png" alt="IP衍生" />
          </div>
          <div class="store-info">
            <h3 class="f24">IP衍生</h3>
            <p class="f16">特色文化创意产品</p>
          </div>
        </div>
      </div>

      <div class="tc mt30">
        <SMoreBotton />
      </div>
    </SVisualAnimation>

    <!-- 4 -->
    <div ref="targetElement" class="exhibition-section ">
      <h2 class="tc f36">常设展览</h2>

      <img class="mt40" src="@/assets/img/home/banner32.png" width="100%" alt="常设展览" />
      <div class="exhibition-content">
        <!-- 左侧图片 -->
        <div class="exhibition-image">
          <img src="@/assets/img/home/banner4.png" alt="常设展览" />
        </div>
        
        <!-- 右侧信息 -->
        <div class="exhibition-info">
          <div class="info-list">
            <div class="list-head display-flex-be mb20">
              <h3>资讯/公告</h3>
              <SMoreBotton style="color: #333; background: #fff;" />
            </div>
            <div class="list-item">
              <span class="date">【展览时间】</span>
              <span class="content">"花蕊夫人"专题展览展厅</span>
              <span class="time">[2024-12-31]</span>
            </div>
            <div class="list-item">
              <span class="date">【展览地点】</span>
              <span class="content">"花蕊夫人"专题展览展厅</span>
              <span class="time">[2024-12-31]</span>
            </div>
            <div class="list-item">
              <span class="date">【展览内容】</span>
              <span class="content">1号-17号展厅为基本陈列展区，18号展厅为临时展览</span>
              <span class="time">[2024-12-31]</span>
            </div>
            <div class="list-item">
              <span class="date">【温馨提示】</span>
              <span class="content">参观博物馆需提前预约，每日接待量视情况而定</span>
              <span class="time">[2024-12-31]</span>
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
                <h4 class="f24 ellipsis-1">古器物修复工坊</h4>
                <p class="mt10 ellipsis-1">零距离接触文物修复工作，体验传统修复记忆</p>
                <p class="ellipsis-1">时间地点：文创中心 / 14:00-16:00</p>
                <div class="display-flex-be mt60">
                  <p class="ml10">￥128</p>
                  <SMoreBotton title="立即报名" style="color: #333; background: #fff;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5 -->
    <div class="special-exhibition">
      <h2 class="tc f36">特别展览</h2>
      
      <Carousel v-bind="{ ...carouselConfig2, gap: 16, autoplay: 3000, snapAlign: 'start' }" class="special-carousel">
        <Slide>
          <div class="special-item">
            <img src="@/assets/img/home/haibao4.png" alt="灵影仙踪" />
            <div class="special-info">
              <h3>灵影仙踪</h3>
              <p>新春特别展览</p>
            </div>
          </div>
        </Slide>
        
        <Slide>
          <div class="special-item">
            <img src="@/assets/img/home/haibao3.png" alt="霓裳魅影" />
            <div class="special-info">
              <h3>霓裳魅影</h3>
              <p>古代服饰艺术展</p>
            </div>
          </div>
        </Slide>
        
        <Slide>
          <div class="special-item">
            <img src="@/assets/img/home/haibao2.png" alt="寰宇东西" />
            <div class="special-info">
              <h3>寰宇东西</h3>
              <p>马可波罗眼中的中国世界</p>
            </div>
          </div>
        </Slide>
        
        <Slide>
          <div class="special-item">
            <img src="@/assets/img/home/haibao1.png" alt="木石双清" />
            <div class="special-info">
              <h3>木石双清</h3>
              <p>江南石供与清派盆景展</p>
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
    </div>

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
}

.special-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.special-item img {
  width: 100%;
  height: auto;
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
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  text-align: center;
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
