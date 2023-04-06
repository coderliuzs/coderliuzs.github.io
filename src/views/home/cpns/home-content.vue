<template>
  <div class="content">
      <h2 class="title">热门精选</h2>
      <div class="list">
        <template v-for="(item, index) in houselist" :key="item.data.houseId">
          <house-item-type-9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)"/>
          <house-item-type-3 v-else-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)"/>
        </template>
      </div>
  </div>
</template>

<script setup>
import HouseItemType9 from '@/components/house-item-type9/house-item-type9.vue';
import HouseItemType3 from '@/components/house-item-type3/house-item-type3.vue';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  router.push("/detail/" + item.houseId)
}

</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>