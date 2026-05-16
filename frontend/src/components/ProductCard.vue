<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Product } from '../types/product.types'
import { useCartStore } from '../stores/cart'

defineProps<{
  product: Product
}>()

const cart = useCartStore()
</script>

<template>
  <article class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
    <!-- Image -->
    <div class="relative overflow-hidden h-48">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span class="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {{ product.category }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-bold text-gray-800 text-base mb-1 line-clamp-2">
        {{ product.name }}
      </h3>
      <p class="text-gray-500 text-sm mb-3 flex-1 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <span class="text-emerald-700 font-bold text-lg">
          ${{ product.price.toFixed(2) }}
        </span>
        <button
          class="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
          @click="cart.addProduct(product)"
          :aria-label="`Agregar ${product.name} al carrito`"
        >
          <Icon icon="mdi:cart-plus" class="text-base" />
          Agregar
        </button>
      </div>
    </div>
  </article>
</template>
