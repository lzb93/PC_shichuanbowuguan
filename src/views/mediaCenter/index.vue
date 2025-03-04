<script setup>
import { ref, onMounted } from 'vue'
import SBreadcrumb from '@/components/SBreadcrumb.vue'
import SMoreBotton from '@/components/SMoreBotton.vue'
import STabs from '@/components/STabs.vue'
import * as mediaApi from '@/api/media'
import { useRouter } from 'vue-router';
const router = useRouter();

const datas = ref({
  information: [],
  notice: []
})
const messagetList = ref([])

const childRef = ref(null);

async function getData() {
  const { data, code, msg } = await mediaApi.getMediaCenter()
  if (code === 1) {
    datas.value = data
    messagetList.value = data.information[0]?.list
  } else {
    console.log(data, msg)
  }
}
getData()
const navItems = ref([
  { id: 'xwzx', title: '新闻资讯'},
  { id: 'tzgg', title: '通知公告' },
])

const handleSollChange = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  setTimeout(()=>{
    childRef.value.setTabClick('xwzx')
  }, 1000)
}

const handleTabChange = (id) => {
  messagetList.value = datas.value.information.find(item => item.type_id === id)?.list
}

const handleMore = () => {
  console.log('handleMore')
}

const handleClick = (url) => {
  router.push(url)
}
</script>

<template>
  <div>
    <div class="banner-bg">
      <SBreadcrumb class="breadcrumb-box" />
      <img src="@/assets/img/other/collect/banner.png" width="100%" alt="banner" />
      <STabs ref="childRef" class="tabs-top" :isBlack="true" :list="navItems" @change="handleSollChange" />
    </div>

    <!-- 列表 -->
    
    <div class="container w1440">
      <h2 id="xwzx" class="red f32 tc mb20 fw6">新闻资讯</h2>
      <div>
        <div class="display-flex-be mb20">
          <STabs v-if="datas.information.length" :isBlack="true" :list="datas.information" :idKey="'type_id'" :titleKey="'information_type'" @change="handleTabChange" />
          <span class="ml20 mt10 cp" @click="handleClick('/mediaCenter/messaget')">查看更多</span>
        </div>
        <div class="activity-list">
          <div class="activity-item" v-for="item in messagetList" :key="item.id" @click="handleClick(`/mediaCenter/messaget/${item.id}`)">
            <div class="activity-item-right">
              <h3 class="title">{{ item.title }}</h3>
              <div class="info">
                <div class="info-item">{{ item.about }}</div>
                <div class="info-item">{{ item.create_time }}</div>
              </div>
            </div>
            <div class="activity-item-left">
              <img src="@/assets/img/home/banner1.png" alt="活动图片" />
            </div>
          </div>

        </div>
        <div class="tc mt20 mb60">
          <SMoreBotton @click="handleClick('/mediaCenter/messaget')" />
        </div>
      </div>

      <h2 id="tzgg" class="red f32 tc mb20 fw6">通知公告</h2>

      <div>
        <div class="notice-list">
          <div class="notice-item" v-for="(item, index) in datas.notice" :key="index" @click="handleClick(`/mediaCenter/notice/${item.id}`)">
            <p class="notice-title">{{ item.title }}</p>
            <p class="notice-desc">[{{ item.create_time }}]</p>
          </div>
        </div>
        <div class="tc mt20 mb60">
          <SMoreBotton @click="handleClick(`/mediaCenter/notice`)" />
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
.tabs-top{
  position: absolute;
  bottom: 20px;
  left: 50px;
  z-index: 100;
}
.breadcrumb-box {
  position: absolute;
  /* color: #fff; */
  margin-left: 40px;
  margin-top: 40px;
}

.container {
  padding: 40px 0;
  margin: 0 auto;
}


/* 列表 */

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 30px;
  padding: 20px;
  background: #fff;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.activity-item-left {
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.activity-item-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.activity-item:hover .activity-item-left img {
  transform: scale(1.05);
}

.activity-item-right {
  flex: 1;
  position: relative;
  padding: 10px 40px;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #666;
}

/* 公告 */

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-item {
  background: url('@/assets/img/other/dianxian.png') no-repeat center center;
  background-repeat: repeat-x;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.notice-img img {
  position: absolute;
  margin: auto;
}

.notice-info {
  padding: 20px 35px;
}

.notice-title {
  background: #fff;
  padding: 10px 20px;
  font-size: 18px;
  color: #333;
}

.notice-title::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 0px;
  margin-right: 10px;
  background: #D9D9D9;
  border-radius: 50%;
}

.notice-title:hover {
  color: #658A98;
  font-weight: bold;
  font-size: 20px;
}

.notice-title:hover::before{
  background: #658A98;
}

.notice-desc {
  font-size: 16px;
  padding: 10px 20px;
  color: #333;
  line-height: 25px;
  background: #fff;
}

</style>
