<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '../stores/cart'
import CheckoutModal from './CheckoutModal.vue'

const cart = useCartStore()
const showCheckout = ref(false)
</script>

<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="cart.isOpen"
      class="fixed inset-0 bg-black/40 z-40"
      @click="cart.closeCart()"
      aria-hidden="true"
    />
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <aside
      v-if="cart.isOpen"
      class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
      role="dialog"
      aria-label="Carrito de compras"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 bg-emerald-700 text-white">
        <h2 class="text-lg font-bold flex items-center gap-2">
          <Icon icon="mdi:cart-outline" class="text-xl" />
          Carrito
          <span class="bg-yellow-400 text-emerald-900 text-xs font-bold rounded-full px-2 py-0.5">
            {{ cart.totalItems }}
          </span>
        </h2>
        <button
          class="text-white hover:text-emerald-200 transition-colors"
          @click="cart.closeCart()"
          aria-label="Cerrar carrito"
        >
          <Icon icon="mdi:close" class="text-2xl" />
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="cart.items.length === 0"
        class="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3"
      >
        <Icon icon="mdi:cart-off" class="text-7xl" />
        <p class="text-lg font-medium">Tu carrito está vacío</p>
        <p class="text-sm">Agrega productos desde el catálogo</p>
      </div>

      <!-- Items list -->
      <ul v-else class="flex-1 overflow-y-auto divide-y divide-gray-100 px-4 py-2">
        <li
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex gap-3 py-4"
        >
          <img
            :src="item.product.image"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded-xl shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
              {{ item.product.name }}
            </p>
            <p class="text-emerald-700 font-bold text-sm">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>

            <!-- Quantity controls -->
            <div class="flex items-center gap-2 mt-2">
              <button
                class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                @click="cart.decrement(item.product.id)"
                :aria-label="`Disminuir cantidad de ${item.product.name}`"
              >
                <Icon icon="mdi:minus" class="text-sm" />
              </button>
              <span class="w-6 text-center text-sm font-semibold">{{ item.quantity }}</span>
              <button
                class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                @click="cart.increment(item.product.id)"
                :aria-label="`Aumentar cantidad de ${item.product.name}`"
              >
                <Icon icon="mdi:plus" class="text-sm" />
              </button>
            </div>
          </div>

          <!-- Remove -->
          <button
            class="text-gray-300 hover:text-red-500 transition-colors self-start"
            @click="cart.remove(item.product.id)"
            :aria-label="`Eliminar ${item.product.name} del carrito`"
          >
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </li>
      </ul>

      <!-- Footer total -->
      <div v-if="cart.items.length > 0" class="border-t border-gray-200 px-5 py-4 bg-gray-50">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600 font-medium">Total</span>
          <span class="text-emerald-700 font-bold text-xl">${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <button
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          @click="showCheckout = true"
        >
          <Icon icon="mdi:credit-card-outline" class="text-lg" />
          Proceder al pago
        </button>
      </div>
    </aside>
  </Transition>

  <!-- Checkout modal -->
  <CheckoutModal
    v-if="showCheckout"
    @close="showCheckout = false"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
