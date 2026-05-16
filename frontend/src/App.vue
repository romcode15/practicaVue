<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import CartSidebar from './components/CartSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavbar />
    <CartSidebar />
    <RouterView />
  </div>
</template>
