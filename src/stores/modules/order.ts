import type { addressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const selectedAddress = ref<addressItem>()
  return { selectedAddress }
})
