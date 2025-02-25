<script setup>
import { RouterLink } from 'vue-router'
const emit = defineEmits(['btnClick'])
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="btn" @click="emit('btnClick')">{{title || '更多'}}</div>
</template>

<style scoped>
.btn{
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  background: #48474F;
  min-width: 58px;
  height: 20px;
  line-height: 20px;
  border-radius: 65px;
  font-size: 14px;
  padding: 0px 12px;
}
</style>
