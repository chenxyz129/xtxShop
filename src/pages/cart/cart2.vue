<script setup lang="ts">
import CartMain from './components/cartMain.vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>

<template>
  <CartMain :paddingBottom="safeAreaInsets!.bottom"></CartMain>
</template>

<style scoped></style>
