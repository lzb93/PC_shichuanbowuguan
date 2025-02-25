<script setup>
// 可视动画组件
import { ref, onMounted, defineProps } from 'vue';
const props = defineProps({
  // 动画方法，必传项
  animation: {
    type: String,
    required: true
  },
});

const targetElement = ref(null);
const isAnimation = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素进入视口时执行的操作
        console.log('元素进入视口');
        isAnimation.value = true;
        // observer.unobserve(entry.target); // 停止观察
      } else {
        console.log('元素离开视口');
        isAnimation.value = false;
      }
    });
  });

  if (targetElement.value) {
    setTimeout(() => {
      observer.observe(targetElement.value);
    }, 500);
  }
})
</script>
<template>
  <div ref="targetElement">
    <div class="animate__animated" :class="isAnimation ? props.animation : ''">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.animate__animated {
  --animate-duration: 2s;
}
</style>