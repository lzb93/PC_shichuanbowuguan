<script setup>
import { ref, defineProps, defineEmits } from 'vue';
// 定义组件接收的 props
const props = defineProps({
  // tab导航的数据列表，每个元素包含 title 和 id
  list: {
    type: Array,
    default: () => []
  },
  idKey: {
    type: String,
    default: 'id'
  },
  titleKey: {
    type: String,
    default: 'title'
  },
  childKey: {
    type: String,
    default: 'child'
  },
  isBlack: {
    type: Boolean,
    default: false
  }
});

// 定义组件触发的事件
const emits = defineEmits(['change']);

// 当前选中的tab
const currentTab = ref(props.list[0] ? props.list[0][props.idKey] : '');  
const activeMenuItem = ref('');
// 点击tab
const handleTabClick = (item) => {
  currentTab.value = item;
  emits('change', item);
}

// 点击子tab
const handleChildClick = (item, child) => {
  item[props.idKey] = child[props.idKey]
  item[props.titleKey] = child[props.titleKey]
  currentTab.value = item[props.idKey];
  activeMenuItem.value = item[props.idKey];
  console.log(props.list, currentTab.value, 'handleChildClick')
  emits('change', item[props.idKey]);
}

// 显示子tab
const showSubMenu = (item) => {
  activeMenuItem.value = item[props.idKey];
}
const hideSubMenu = () => {
  activeMenuItem.value = null;
}

const setTabClick = (item) => {
  currentTab.value = item;
}

defineExpose({
  setTabClick
});
</script>

<template>
  <div class="tab-box" :class="{ 'black': isBlack }">
    <div v-for="(item, index) in list" :key="index" @mouseenter="showSubMenu(item)" @mouseleave="hideSubMenu">
      <div class="tab-item derline" :class="{ 'w100': item[idKey] === currentTab, 'derlineBlack': isBlack }" @click="handleTabClick(item[idKey])">
        {{ item[titleKey] }}
      </div>
      <div class="tab-child" v-if="item[childKey] && item[childKey].length && activeMenuItem === item[idKey]">
        <div class="tab-child-ul">
          <div :class="{ 'active': currentTab === child[idKey] }" v-for="(child, cIndex) in item[childKey]" :key="cIndex" @click="handleChildClick(item, child)">{{ child[titleKey] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-box {
  display: flex;
  font-size: 20px;
  gap: 60px;
  position: relative;
  div {
    color: #ffffff;
  }
  .tab-child{
    cursor: pointer;
    position: absolute;
    margin-left: -10px;
    padding-top: 20px;
  }

  .tab-child-ul {
    min-width: 100px;
    padding: 15px 10px;
    font-size: 18px;
    line-height: 1.5;
    height: auto;
    background: #00000090;
    z-index: 100;
  }

  .active {
    font-weight: 600;
  }
}

.black {
  div {
    color: #333;
  }
  .tab-child-ul {
    background: #ffffff90;
  }
}

:deep(.w100.derlineBlack::after) {
  width: 100%;
}
</style>