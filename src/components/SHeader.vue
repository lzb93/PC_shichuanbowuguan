<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
const menuItems = ref([]);
const router = useRouter();
// 定义打印所有路由数据的方法
const printAllRoutes = () => {
  const allRoutes = [
      { 
          path: '/',
          name: 'Home',
          meta: {
              title: '首页'
          } 
      },
      ...router.options.routesTree
  ]
  menuItems.value = allRoutes
};
onBeforeMount(() => {
  // 在组件挂载前更新消息
  printAllRoutes()
});

const activeMenuItem = ref(null)

const showSubMenu = (item) => {
  activeMenuItem.value = item
}

const hideSubMenu = () => {
  activeMenuItem.value = null
}

defineProps({
  isHome: {
    type: Boolean,
    default: false
  },
})

</script>

<template>
  <header class="header" :class="{ 'is-home': isHome }">
    <div class="header-main">
      <!-- Logo区域 -->
      <div class="logo">
        <img v-if="isHome" src="@/assets/img/logo3.png" alt="四川名人馆" />
        <img v-else src="@/assets/img/logo2.png" alt="四川名人馆" />
      </div>

      <!-- 主导航菜单 -->
      <nav id="mainNav" class="main-nav">
        <ul>
          <li v-for="item in menuItems" 
              :key="item.name"
              @mouseenter="showSubMenu(item)"
              @mouseleave="hideSubMenu">
            <router-link v-if="!item.hide" :class="isHome ? 'derline' : 'derlineBlack'" :to="item.path">{{ item.meta.title }}</router-link>
            
            <!-- 子导航菜单 -->
            <div v-if="item.children && item.children.length && activeMenuItem === item" 
                 class="sub-nav">
              <ul>
                <li v-for="subItem in item.children" 
                    :key="subItem.name">
                  <router-link :to="subItem.path">{{ subItem.meta.title }}</router-link>
                </li>
              </ul>
              <Teleport to="#mainNav">
                <div class="main-nav-after">
                  <!-- <div class="animate__animated animate__fadeInDown"></div> -->
                </div>
              </Teleport>
            </div>


          </li>
        </ul>
       
      </nav>

      <!-- 语言切换 -->
      <div class="lang-switch">
        <span>EN</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.is-home {
  background: #E24021;
  position: fixed;
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  /* color: white; */
}

.is-home .header-main {
  color: white;
}
.is-home .main-nav a {
  color: white;
}

.logo {
  height: 40px;
}

.logo img {
  height: 100%;
}
.main-nav {
  width: 80%;
}
.main-nav ul {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li {
  position: relative;
}

.main-nav a {
  text-decoration: none;
  font-size: 16px;
  transition: opacity 0.3s;
}

.main-nav a:hover {
  opacity: 0.8;
}

.lang-switch {
  cursor: pointer;
  font-size: 14px;
}

.main-nav-after {
  content: '';
  position: absolute;
  top: 64px;
  left: 0;
  z-index: 8;
  width: 100vw;
  height: 50px;
  background: linear-gradient( 180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
}
.main-nav-after div {
  width: 100%;
  height: 50px;
  background: linear-gradient( 180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
}

.sub-nav {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  /* background: rgba(0,0,0,0.8); */
  padding: 10px 20px;
  border-radius: 4px;
  min-width: 120px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 9;
}

.main-nav li:hover .sub-nav {
  opacity: 1;
  visibility: visible;
}

.sub-nav ul {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  line-height: 50px;
  padding: 0;
}

.sub-nav a {
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  display: block;
  padding: 5px 0;
}

.sub-nav a:hover {
  opacity: 0.8;
}

.is-home .main-nav-after {
  background: linear-gradient( 180deg, rgba(96,29,16,0.8) 0%, rgba(96,29,16,0) 100%);
}
.is-home .main-nav-after div {
  background: linear-gradient( 180deg, rgba(96,29,16,0.8) 0%, rgba(96,29,16,0) 100%);
}
.is-home .sub-nav a {
  color: #ffffff;
}
/* 激活状态样式 */
.router-link-active {
  font-weight: bold;
  opacity: 1 !important;
}
</style>
