<script setup>
import { ref, defineProps, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 定义组件接收的 props
const props = defineProps({
  // 面包屑导航的数据列表，每个元素包含 title 和 link（可选）
  list: {
    type: Array,
    default: () => []
  }
});

const route = useRoute();
const router = useRouter();
const routes = router.options.routes;
const breadcrumbList = ref([]);

const generateBreadcrumb = () => {
  if (props.list.length > 0) { // 如果传入了列表，则使用传入的列表
    breadcrumbList.value = props.list;
    return;
  }
  const matchedRoutes = route.matched;
  const lists = [{ title: '首页', link: '/' }];
  matchedRoutes.forEach((matchedRoute) => {
    if (matchedRoute.meta && matchedRoute.meta.title) {
      if (matchedRoute.meta.pid) {
        const pid = matchedRoute.meta.pid.split('/')
        const pidList = routes.filter(o => pid.includes(o.name)) 
        pidList.map(o => {
          lists.push({
            link: o.path,
            title: o.meta.title
          })
        })
      }
      lists.push({
        link: route.name === matchedRoute.name ? undefined : matchedRoute.path,
        title: matchedRoute.meta.title
      });
    }
  });
  breadcrumbList.value = lists;
};

// 监听路由变化，重新生成面包屑
watch(() => route.path, () => {
  generateBreadcrumb();
});
generateBreadcrumb()
</script>

<template>
  <div class="breadcrumb">
    <span v-for="(item, index) in breadcrumbList" :key="index">
      <!-- 如果有链接则渲染为 a 标签 -->
      <router-link v-if="item.link" :to="item.link">{{ item.title }}</router-link>
      <!-- <a v-if="item.link" :href="item.link">{{ item.title }}</a> -->
      <!-- 没有链接则渲染为普通文本 -->
      <span v-else>{{ item.title }}</span>
      <!-- 除了最后一个元素，每个元素后面添加分隔符 -->
      <span v-if="index < breadcrumbList.length - 1"> &gt; </span>
    </span>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb a {
  text-decoration: none;
  margin-right: 5px;
  color: inherit;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span {
  margin-right: 5px;
}
</style>