<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useCartStore } from '../stores/cart'

const emit = defineEmits<{
  close: []
}>()

const cart = useCartStore()

// Steps: 'form' | 'success'
const step = ref<'form' | 'success'>('form')
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  card: '',
  expiry: '',
  cvv: '',
})

const errors = reactive({
  name: '',
  email: '',
  card: '',
  expiry: '',
  cvv: '',
})

function formatCard(e: Event) {
  const input = e.target as HTMLInputElement
  form.card = input.value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement
  const digits = input.value.replace(/\D/g, '').slice(0, 4)
  form.expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function validate(): boolean {
  let valid = true

  errors.name = form.name.trim().length < 3 ? 'Ingresa tu nombre completo.' : ''
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Correo inválido.'
  errors.card = form.card.replace(/\s/g, '').length === 16 ? '' : 'Número de tarjeta inválido.'
  errors.expiry = /^\d{2}\/\d{2}$/.test(form.expiry) ? '' : 'Formato MM/AA.'
  errors.cvv = /^\d{3,4}$/.test(form.cvv) ? '' : 'CVV inválido.'

  for (const key of Object.keys(errors) as (keyof typeof errors)[]) {
    if (errors[key]) valid = false
  }
  return valid
}

async function submitPayment() {
  if (!validate()) return

  loading.value = true
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1800))
  loading.value = false
  step.value = 'success'
}

function finish() {
  cart.clearCart()
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="step === 'form' && !loading && emit('close')"
    >
      <Transition name="pop" appear>
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          <!-- ── SUCCESS STATE ── -->
          <div v-if="step === 'success'" class="flex flex-col items-center text-center px-8 py-12 gap-4">
            <div class="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <Icon icon="mdi:check-circle" class="text-5xl text-emerald-500" />
            </div>
            <h2 class="text-2xl font-extrabold text-gray-800">¡Compra exitosa!</h2>
            <p class="text-gray-500 text-sm leading-relaxed">
              Tu pedido ha sido procesado correctamente.<br />
              Recibirás un correo de confirmación pronto.
            </p>
            <p class="text-emerald-700 font-bold text-lg">
              Total pagado: ${{ cart.totalPrice.toFixed(2) }}
            </p>
            <button
              class="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              @click="finish"
            >
              <Icon icon="mdi:home-outline" class="text-lg" />
              Volver al inicio
            </button>
          </div>

          <!-- ── FORM STATE ── -->
          <template v-else>
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 bg-emerald-700 text-white">
              <h2 class="font-bold text-lg flex items-center gap-2">
                <Icon icon="mdi:credit-card-outline" class="text-xl" />
                Datos de pago
              </h2>
              <button
                class="hover:text-emerald-200 transition-colors"
                :disabled="loading"
                @click="emit('close')"
                aria-label="Cerrar modal"
              >
                <Icon icon="mdi:close" class="text-2xl" />
              </button>
            </div>

            <!-- Order summary -->
            <div class="bg-emerald-50 px-6 py-3 flex justify-between items-center text-sm">
              <span class="text-gray-600">
                <Icon icon="mdi:cart-outline" class="inline mr-1" />
                {{ cart.totalItems }} producto{{ cart.totalItems !== 1 ? 's' : '' }}
              </span>
              <span class="text-emerald-700 font-bold text-base">${{ cart.totalPrice.toFixed(2) }}</span>
            </div>

            <!-- Form -->
            <form class="px-6 py-5 flex flex-col gap-4" @submit.prevent="submitPayment" novalidate>
              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Nombre del titular</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Juan Pérez"
                  class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  :class="errors.name ? 'border-red-400' : 'border-gray-200'"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Correo electrónico</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  :class="errors.email ? 'border-red-400' : 'border-gray-200'"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>

              <!-- Card number -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Número de tarjeta</label>
                <div class="relative">
                  <input
                    :value="form.card"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    class="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    :class="errors.card ? 'border-red-400' : 'border-gray-200'"
                    @input="formatCard"
                  />
                  <Icon icon="mdi:credit-card-outline" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>
                <p v-if="errors.card" class="text-red-500 text-xs mt-1">{{ errors.card }}</p>
              </div>

              <!-- Expiry + CVV -->
              <div class="flex gap-3">
                <div class="flex-1">
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Vencimiento</label>
                  <input
                    :value="form.expiry"
                    type="text"
                    placeholder="MM/AA"
                    maxlength="5"
                    class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    :class="errors.expiry ? 'border-red-400' : 'border-gray-200'"
                    @input="formatExpiry"
                  />
                  <p v-if="errors.expiry" class="text-red-500 text-xs mt-1">{{ errors.expiry }}</p>
                </div>
                <div class="w-28">
                  <label class="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                  <input
                    v-model="form.cvv"
                    type="text"
                    placeholder="123"
                    maxlength="4"
                    class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    :class="errors.cvv ? 'border-red-400' : 'border-gray-200'"
                  />
                  <p v-if="errors.cvv" class="text-red-500 text-xs mt-1">{{ errors.cvv }}</p>
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-1"
              >
                <Icon v-if="loading" icon="mdi:loading" class="text-lg animate-spin" />
                <Icon v-else icon="mdi:lock-outline" class="text-lg" />
                {{ loading ? 'Procesando...' : 'Pagar ahora' }}
              </button>
            </form>
          </template>

        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.pop-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
