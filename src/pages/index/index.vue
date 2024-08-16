<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPannel from './components/CategoryPannel.vue'
import HotIntro from './components/HotIntro.vue'
import skeleton from './skeleton.vue'
import { reqHomeBanner, reqHomeCategory, reqHotIntro, reqGuessLike } from '@/services/home'
import type { BannerItem, CategoryItem, HotIntroItem, guessLikeItem } from '@/types/home'
import { ref } from 'vue'

let isLoading = ref(false)
const bannerList = ref<BannerItem[]>()
const getHomeBanner = async () => {
  const res = await reqHomeBanner()
  bannerList.value = res.result
}

const categoryList = ref<CategoryItem[]>([])
const getHomeCategory = async () => {
  const res = await reqHomeCategory()
  categoryList.value = res.result
}

const HotIntroList = ref<HotIntroItem[]>([])
const getHotIntroList = async () => {
  const res = await reqHotIntro()
  HotIntroList.value = res.result
}

const guessRef = ref()
//上拉加载更多
const scrolltolower = () => {
  guessRef.value.getGuessLike()
}

//下拉刷新
let isRefreshing = ref(false)
const refresherrefresh = async () => {
  isRefreshing.value = true
  guessRef.value.reset()
  await Promise.all([getHomeBanner(), getHomeCategory(), getHotIntroList()])
  isRefreshing.value = false
}

onLoad(() => {
  isLoading.value = true
  Promise.all([getHomeBanner(), getHomeCategory(), getHotIntroList()])
  isLoading.value = false
})
</script>

<template>
  <CustomNavbar />
  <skeleton v-if="isLoading" />
  <scroll-view
    v-else
    scroll-y
    @scrolltolower="scrolltolower"
    refresher-enabled
    :refresher-triggered="isRefreshing"
    @refresherrefresh="refresherrefresh"
  >
    <XtxSwiper :list="bannerList" />
    <CategoryPannel :list="categoryList" />
    <HotIntro :list="HotIntroList" />
    <XtxGuessLike ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-view {
  flex: 1;
}
</style>
