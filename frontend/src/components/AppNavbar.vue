<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <nav class="bg-emerald-700 text-white shadow-lg sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold hover:text-emerald-200 transition-colors">
        <Icon icon="mdi:paw" class="text-2xl" />
        <span>VetShop</span>
      </RouterLink>

      <!-- Links -->
      <div class="hidden sm:flex items-center gap-6 text-sm font-medium">
        <RouterLink
          to="/"
          class="hover:text-emerald-200 transition-colors"
          active-class="text-emerald-200 underline underline-offset-4"
        >
          Inicio
        </RouterLink>
        <RouterLink
          to="/catalogo"
          class="hover:text-emerald-200 transition-colors"
          active-class="text-emerald-200 underline underline-offset-4"
        >
          Catálogo
        </RouterLink>
      </div>

      <!-- Cart button -->
      <button
        class="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition-colors px-4 py-2 rounded-full text-sm font-semibold"
        @click="cart.toggleCart()"
        aria-label="Abrir carrito de compras"
      >
        <Icon icon="mdi:cart-outline" class="text-xl" />
        <span class="hidden sm:inline">Carrito</span>
        <span
          v-if="cart.totalItems > 0"
          class="absolute -top-2 -right-2 bg-yellow-400 text-emerald-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ cart.totalItems }}
        </span>
      </button>
    </div>

    <!-- Mobile links -->
    <div class="sm:hidden flex gap-4 px-4 pb-2 text-sm font-medium">
      <RouterLink
        to="/"
        class="hover:text-emerald-200 transition-colors"
        active-class="text-emerald-200 underline underline-offset-4"
      >
        Inicio
      </RouterLink>
      <RouterLink
        to="/catalogo"
        class="hover:text-emerald-200 transition-colors"
        active-class="text-emerald-200 underline underline-offset-4"
      >
        Catálogo
      </RouterLink>
    </div>
  </nav>
</template>
