<template>
 <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

  <tab-bar v-show="!route.meta.hideTabBar"/>
  <!-- 隐藏底部tabbar栏 -->
  <!-- 当route为home等路由时meta的hideTabBar未设值默认是undefined,而undefined取反就是true -->

  <loading />
 </div>
</template>

<script setup>
import TabBar from "@/components/tab-bar/tab-bar.vue"
import Loading from '@/components/loading/loading.vue'
import { useRoute } from "vue-router";

const route = useRoute()

</script>

<style scoped>
</style>
