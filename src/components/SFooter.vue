<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import useDataStore from '@/stores'

const dataStore = useDataStore();
const systemData = ref(dataStore.systemData)
console.log(systemData)
const imgs = ref(dataStore.mediaList)
const urls = ref([
  {
    title: '网站地图',
    url: 'http://baidu.com',
  },
  {
    title: '友情链接',
    url: 'http://baidu.com',
  },
  {
    title: '留言板',
    url: 'http://baidu.com',
  },
  {
    title: '联系我们',
    url: 'http://baidu.com',
  },
  {
    title: '版权声明',
    url: 'http://baidu.com',
  },
  {
    title: '隐私安全声明',
    url: 'http://baidu.com',
  }
])
</script>
<template>
  <footer>
    <p class="top-p">四川名人馆融媒矩阵:</p>
    
    <div class="img-box">
      <div v-for="(item, index) in imgs" :key='index' class="img-item">
        <img :src="item.icon" width="60" height="60" />
        <div class="qrcode-box">
          <img :src="item.qrcode" width="100%" height="100%" />
          <img class="bottom-img" src="@/assets/img/icon/bottom.png" width="13" height="7" />
        </div>
      </div>
    </div>
    <div class="url-warp">
      <div class="url-box" v-for="(item, index) in urls" :key='index' >
        <span v-if="index !== 0" class="more-box">⋮</span>
        <a :href="item.url">{{item.title}}</a>
      </div>
    </div>
    <p class="tc"><a :href="systemData.icp_url?.value" target="_blank">{{systemData.icp_permit?.value}}</a> <span style="margin-left: 50px;">技术支持：先行网络服务有限公司</span></p>
    <img alt="四川名人馆" class="logo" src="@/assets/img/logo.png" width="142" height="40" />
  </footer>
</template>

<style scoped lang="scss">
footer{
  color: #ffffff;
  padding: 1px 0px;
  >p{
    margin: 55px auto 0;
    color: #ffffff;
  }
  a{
    color: #ffffff;
  }
  .top-p{
    width: 1080px;
  }
  width: 100vw;
  height: 565px;
  background: #262727;
  font-size: 14px;
}
.img-box{
  margin-top: 68px;
  display: flex;
  justify-content: center;
  gap: 67px;
  margin-bottom: 84px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 4px;
  }
}
.img-item{
  position: relative;
}
.qrcode-box{
  position: absolute;
  bottom: 70px;
  left: -30px;
  width: 120px;
  height: 120px;
  background: #ffffff;
  padding: 5px;
  display: none;
  text-align: center;
  .bottom-img{
    vertical-align: super;
  }
}
.img-item:hover{
  .qrcode-box{
    display: block;
  }
}
.url-warp{
  border-top: 1px solid #404040;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
.url-box{

}
.more-box{
  color: #ffffff;
  font-size: 18px;
  vertical-align: middle;
  margin-top: -2px;
  display: inline-block;
  margin-left: 66px;
  margin-right: 66px;
  opacity: 60%;
}
.logo{
  display: block;
  margin: 55px auto;
}
</style>
