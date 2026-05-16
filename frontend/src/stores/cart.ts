import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, CartItem } from '../types/product.types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  function addProduct(product: Product) {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    isOpen.value = true
  }

  function increment(productId: number) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) item.quantity++
  }

  function decrement(productId: number) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        remove(productId)
      }
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function closeCart() {
    isOpen.value = false
  }

  function clearCart() {
    items.value = []
    isOpen.value = false
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addProduct,
    increment,
    decrement,
    remove,
    toggleCart,
    closeCart,
    clearCart,
  }
})
