<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { Category } from '../types/product.types'

const router = useRouter()

const categories: { name: Category; icon: string; color: string }[] = [
  { name: 'Alimentos', icon: 'mdi:food-drumstick-outline', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
  { name: 'Higiene',   icon: 'mdi:shower-head',            color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' },
  { name: 'Juguetes',  icon: 'mdi:tennis-ball',            color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' },
  { name: 'Accesorios',icon: 'mdi:tag-heart-outline',      color: 'bg-pink-100 hover:bg-pink-200 text-pink-700' },
]

function goToCategory(category: Category) {
  router.push({ path: '/catalogo', query: { categoria: category } })
}
</script>

<template>
  <main>
    <!-- Hero Banner -->
    <section class="relative bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white overflow-hidden">
      <!-- Background paw pattern -->
      <div class="absolute inset-0 opacity-10 flex flex-wrap gap-8 p-8 select-none pointer-events-none">
        <Icon
          v-for="i in 20"
          :key="i"
          icon="mdi:paw"
          class="text-8xl"
        />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-20 sm:py-28 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Todo lo que tu mascota<br />
          <span class="text-yellow-300">necesita y merece</span>
        </h1>
        <p class="text-emerald-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Productos de calidad para perros, gatos y más. Directo desde nuestra veterinaria a tu hogar.
        </p>
        <RouterLink
          to="/catalogo"
          class="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold text-lg px-8 py-3 rounded-full transition-colors shadow-lg"
        >
          <Icon icon="mdi:storefront-outline" class="text-xl" />
          Ver catálogo
        </RouterLink>
      </div>
    </section>

    <!-- About section -->
    <section class="bg-white py-14 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Icon icon="mdi:hospital-building" class="text-emerald-600 text-4xl" />
          Sobre VetShop
        </h2>
        <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Somos una veterinaria con más de 10 años de experiencia cuidando a tus mascotas.
          Nuestro equipo de profesionales selecciona cada producto pensando en la salud,
          bienestar y felicidad de tus compañeros de vida.
        </p>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-emerald-50 rounded-2xl p-6">
            <Icon icon="mdi:trophy-outline" class="text-5xl text-emerald-600 mx-auto mb-2" />
            <h3 class="font-bold text-emerald-800 text-lg">Calidad garantizada</h3>
            <p class="text-gray-500 text-sm mt-1">Solo marcas certificadas y recomendadas por veterinarios.</p>
          </div>
          <div class="bg-emerald-50 rounded-2xl p-6">
            <Icon icon="mdi:truck-fast-outline" class="text-5xl text-emerald-600 mx-auto mb-2" />
            <h3 class="font-bold text-emerald-800 text-lg">Entrega rápida</h3>
            <p class="text-gray-500 text-sm mt-1">Recibe tus pedidos en 24-48 horas en toda la ciudad.</p>
          </div>
          <div class="bg-emerald-50 rounded-2xl p-6">
            <Icon icon="mdi:chat-question-outline" class="text-5xl text-emerald-600 mx-auto mb-2" />
            <h3 class="font-bold text-emerald-800 text-lg">Asesoría experta</h3>
            <p class="text-gray-500 text-sm mt-1">Nuestros veterinarios te ayudan a elegir el mejor producto.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-gray-50 py-14 px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-2">Categorías</h2>
        <p class="text-gray-500 text-center mb-10">Encuentra exactamente lo que tu mascota necesita</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="cat in categories"
            :key="cat.name"
            class="flex flex-col items-center gap-3 p-6 rounded-2xl font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
            :class="cat.color"
            @click="goToCategory(cat.name)"
          >
            <Icon :icon="cat.icon" class="text-5xl" />
            <span class="text-base">{{ cat.name }}</span>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
