<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import type { Category } from '../types/product.types'

const route = useRoute()

const categories: Category[] = ['Alimentos', 'Higiene', 'Juguetes', 'Accesorios']

const search = ref('')
const selectedCategory = ref<Category | 'Todos'>('Todos')

watch(
  () => route.query.categoria,
  (val) => {
    if (val && categories.includes(val as Category)) {
      selectedCategory.value = val as Category
    } else {
      selectedCategory.value = 'Todos'
    }
  },
  { immediate: true },
)

const filtered = computed(() => {
  return products.filter((p) => {
    const matchesCategory =
      selectedCategory.value === 'Todos' || p.category === selectedCategory.value
    const matchesSearch =
      search.value.trim() === '' ||
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.description.toLowerCase().includes(search.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Catálogo de productos</h1>
    <p class="text-gray-500 mb-8">
      {{ filtered.length }} producto{{ filtered.length !== 1 ? 's' : '' }} encontrado{{ filtered.length !== 1 ? 's' : '' }}
    </p>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <!-- Search -->
      <div class="relative flex-1">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          v-model="search"
          type="search"
          placeholder="Buscar productos..."
          class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
        />
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2">
        <button
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border"
          :class="
            selectedCategory === 'Todos'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400'
          "
          @click="selectedCategory = 'Todos'"
        >
          Todos
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border"
          :class="
            selectedCategory === cat
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400'
          "
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Products grid -->
    <div
      v-if="filtered.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filtered"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-24 text-gray-400 gap-3"
    >
      <Icon icon="mdi:magnify-close" class="text-7xl" />
      <p class="text-xl font-semibold">Sin resultados</p>
      <p class="text-sm">Intenta con otro término o categoría</p>
      <button
        class="mt-4 text-emerald-600 hover:underline text-sm font-medium flex items-center gap-1"
        @click="search = ''; selectedCategory = 'Todos'"
      >
        <Icon icon="mdi:filter-remove-outline" class="text-base" />
        Limpiar filtros
      </button>
    </div>
  </main>
</template>
