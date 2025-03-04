<script setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head';
import SHeader from './components/SHeader.vue'
import SFooter from './components/SFooter.vue'
import useDataStore from '@/stores'
const route = useRoute()
const dataStore = useDataStore();
const isInit = ref(false)
onMounted(async () => {
  const systemData = await dataStore.getSystemSetting()
  const mediaList = await dataStore.getMediaMatrixList()
  useHead({
    title: '四川名人馆',
    meta: [
      {
        name: 'description',
        content: systemData.s_e_page_description?.value
      },
      {
        name: 'keywords',
        content: systemData.s_e_website_keywords?.value
      }
    ]
  });
  // console.log(dataStore.systemData, 'useDataStore')
  isInit.value = true
})
</script>

<template>
  <div :class="false ? 'app-filter' : ''">
    <SHeader :isHome="route.name === 'Home'" />
    <RouterView />
    <SFooter v-if="isInit" />
  </div>
</template>

<style scoped>
.app-filter {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}


</style>
