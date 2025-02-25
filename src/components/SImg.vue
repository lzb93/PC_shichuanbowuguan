<script setup>
import { ref, onMounted, defineProps } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  // 图片的路径，必传项
  src: {
    type: String,
    required: true
  },
  // 图片的替代文本，默认为空字符串
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: 'auto'
  },
  height: {
    type: String,
    default: 'auto'
  },
});

// 定义响应式变量
const imageUrl = ref('');
const errorMessage = ref('');

// 在组件挂载后执行图片加载操作
onMounted(async () => {
  try {
    // 动态导入图片
    const module = await import(/* @vite-ignore */`${props.src}`); // 一直报错懒去写了，没办法
    // 将图片的 URL 赋值给 imageUrl
    console.log(module)
    imageUrl.value = module.default;
  } catch (error) {
    // 若加载失败，设置错误信息
    errorMessage.value = 'Failed to import image: ' + error.message;
    console.error(errorMessage.value);
  }
});
</script>
<template>
  <img v-if="imageUrl" :src="imageUrl" :alt="alt" :width='width' :height='height' />
  <p v-else>{{ errorMessage }}</p>
</template>

<style scoped>
/* 可以添加组件的样式 */
img {
  max-width: 100%;
  height: auto;
}
</style>