<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue" 
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- tab栏的切换 -->
      <van-tabs v-model:active="tabAcyive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="tabAcyive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import cityGroup from './cpns/city-group.vue';


const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
  router.back()
  // back方法点击取消返回上一级
}

// tab的切换
const tabAcyive = ref()

// 从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
// const currentGroup = allCities.value["tabAcyive.value"]  这样写的话vue的响应式就会失效
const currentGroup = computed(() => allCities.value[tabAcyive.value])

</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 97px);
    overflow-y: auto;
  }
}

</style>