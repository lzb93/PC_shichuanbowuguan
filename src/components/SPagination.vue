<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  // 当前页码，默认为 1
  currentPage: {
    type: Number,
    default: 1
  },
  // 每页显示的记录数，默认为 10
  pageSize: {
    type: Number,
    default: 10
  },
  // 总记录数
  total: {
    type: Number,
    default: 0
  }
});
console.log(props, 'props')
// 定义组件触发的事件
const emits = defineEmits(['page-change']);

// 计算总页数
let totalPages = Math.ceil(props.total / props.pageSize);

watch([() => props.currentPage, () => props.pageSize, () => props.total], () => {
  totalPages = Math.ceil(props.total / props.pageSize)
  window.scrollTo({
    top: 0,
    // behavior: 'smooth' // 平滑滚动效果
  });
});

// 跳转页码输入框绑定的值
const jumpPage = ref('');

// 上一页方法
const prevPage = () => {
  if (props.currentPage > 1) {
    emits('page-change', props.currentPage - 1);
  }
};

// 下一页方法
const nextPage = () => {
  if (props.currentPage < totalPages) {
    emits('page-change', props.currentPage + 1);
  }
};

// 跳转到指定页码方法
const goToPage = (page) => {
  emits('page-change', page);
};

// 输入页码跳转方法
const jumpToPage = () => {
  const page = parseInt(jumpPage.value);
  if (!isNaN(page) && page >= 1 && page <= totalPages) {
    emits('page-change', page);
  }
  jumpPage.value = '';
};
</script>

<template>
  <div class="pagination">
    <!-- 上一页按钮 -->
    <span class="color-gray" @click="prevPage" :disabled="currentPage === 1">&lt;</span>
    <!-- 页码列表 -->
    <template v-for="page in totalPages" :key="page">
      <span v-if="page < 6"  @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</span>
      <p v-if="totalPages > 10 && page === 6">...</p>
      <span v-if="totalPages > 10 && page === totalPages"  @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</span>
      <span v-if="totalPages <= 10 && page > 6"  @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</span>
    </template>
    <!-- 下一页按钮 -->
    <span class="color-gray" @click="nextPage" :disabled="currentPage === totalPages">&gt;</span>
    <!-- 跳转输入框和按钮 -->
    <p class="tr" style="width: 90px;">前往</p>
    <input v-model="jumpPage" type="number" min="1" :max="totalPages" @blur="jumpToPage">
    <p>页</p>
  </div>
</template>

<style scoped>
.color-gray{
  color: #835E1D;
  border: none !important;
}
.pagination {
  margin: 60px auto 80px;
  width: 550px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination span {
  margin: 0 5px;
  cursor: pointer;
  width: 48px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #E2E8F0;
  border-radius: 5px 5px 5px 5px;
  display: inline-block;
}
.pagination p {
  line-height: 48px;
  display: inline-block;
}

.pagination span.active {
  background: #835E1D;
  border: 1px solid #835E1D;
  color: white;
}

.pagination input {
  margin: 0 5px;
  padding: 5px;
  width: 50px;
}
</style>