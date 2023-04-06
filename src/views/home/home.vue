<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="('03.27')" :end-date="('03.28')" />
    </div>

    <home-content />
  </div>
</template>

<script>
  export default { name: "home" }
</script>

<script setup>
import { watch, computed, ref, onActivated } from "vue";

import useHomeStore  from '@/stores/modules/home';
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import SearchBar from '@/components/search-bar/search-bar.vue'

import useScroll from '@/hooks/useScroll';

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 页面滚动到底部时的操作
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示的控制
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

// 跳转回home时,保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>