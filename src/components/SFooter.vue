<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import image1 from '@/assets/img/icon/icons (1).png';
import image2 from '@/assets/img/icon/icons (2).png';
import image3 from '@/assets/img/icon/icons (3).png';
import image4 from '@/assets/img/icon/icons (4).png';
import image5 from '@/assets/img/icon/icons (5).png';
import image6 from '@/assets/img/icon/icons (6).png';
import image7 from '@/assets/img/icon/icons (7).png';
import image8 from '@/assets/img/icon/icons (8).png';
import image9 from '@/assets/img/icon/icons (9).png';
const imgs = ref([
  {
    img: image1,
  },
  {
    img: image2,
  },
  {
    img: image3,
  },
  {
    img: image4,
  },
  {
    img: image5,
  },
  {
    img: image6,
  },
  {
    img: image7,
  },
  {
    img: image8,
  },
  {
    img: image9,
  }
])
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
      <img v-for="(item, index) in imgs" :key='index' :src="item.img" width="60" height="60" />
    </div>
    <div class="url-warp">
      <div class="url-box" v-for="(item, index) in urls" :key='index' >
        <span v-if="index !== 0" class="more-box">⋮</span>
        <a :href="item.url">{{item.title}}</a>
      </div>
    </div>
    <p class="tc">Copyright 2011-2024 四川名人馆 All Rights Reserved 川ICP备12345678号 <span style="margin-left: 50px;">技术支持：先行网络服务有限公司</span></p>
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
