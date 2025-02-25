<script setup>
import { RouterView, useRoute } from 'vue-router'
import SHeader from './components/SHeader.vue'
import SFooter from './components/SFooter.vue'

const route = useRoute()
</script>

<template>
  <SHeader :isHome="route.name === 'Home'" />
  <RouterView />
  <SFooter />
</template>

<style scoped>
</style>
