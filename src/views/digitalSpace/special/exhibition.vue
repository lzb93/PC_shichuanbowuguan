<script setup>
import { ref } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
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

const active = ref(1)
const list = ref([
  {
    id: 1,
    title: '展览1',
    img: 'https://picsum.photos/200/300',
    list: [
      {
        id: 1,
        title: '展览1',
        img: 'https://picsum.photos/200/300'
      },
      {
        id: 2,
        title: '展览2',
        img: 'https://picsum.photos/200/300'
      }
    ]
  },
  {
    id: 2,
    title: '展览2',
    img: 'https://picsum.photos/200/300',
    list: [
      {
        id: 1,
        title: '展览1',
        img: 'https://picsum.photos/200/300'
      },
      {
        id: 2,
        title: '展览2',
        img: 'https://picsum.photos/200/300'
      }
    ]
  }, 
  {
    id: 3,
    title: '展览3',
    img: 'https://picsum.photos/200/300',
    list: []
  }
])
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
      <h1 class="banner-title">云端展览</h1>
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
    </div>

    <!-- 列表 -->
    <div class="container">
      <div class="tc">
        <div class="exhibition-box">
          <div class="exhibition-item" :class="{'active': active === item.id}" v-for="item in list" :key="item.id">
            {{ item.title }}
          </div>
        </div>
        <div class="exhibition-child-box">
          <div class="exhibition-child" :class="{'active-child': active === item.id}" v-for="item in list" :key="item.id">
            {{ item.title }}
          </div>
        </div>
        <!-- bg -->
        <div class="exhibition-bg">
          <img src="@/assets/img/other/bg.png" width="100%" alt="bg" />
        </div>
      </div>
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

.exhibition-box{
  display: flex;
  flex-wrap: wrap;
  gap: 52px;
  justify-content: center;
}

.exhibition-item{
  width: 120px;
  height: 41px;
  text-align: center;
  line-height: 41px;
  background: url('@/assets/img/other/btn2.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  margin-bottom: 30px;
}
.active{
  background: url('@/assets/img/other/btn3.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.exhibition-child-box{
  display: flex;
  flex-wrap: wrap;
  gap: 52px;
  justify-content: center;
}
.exhibition-child{
  text-align: center;
  line-height: 41px;
  font-size: 20px;
  cursor: pointer;
}
.active-child{
  color: #5A715F;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  border-bottom: 1px solid #5A715F;
}
.active-child::before, .active-child::after{
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: url('@/assets/img/other/icon.png') no-repeat;
  background-size: 100% 100%;
  margin: 13px 5px;
}

.exhibition-bg{
  width: 90%;
  max-width: 1600px;
  margin: 40px auto;
  
}

</style>
