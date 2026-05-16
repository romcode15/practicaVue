# VetShop — Frontend SPA

Aplicación web de una sola página (SPA) para la venta y visualización de productos básicos para mascotas dentro de una veterinaria. Desarrollada con **Vue 3**, **TypeScript**, **Pinia** y **Tailwind CSS v4**. Todos los datos son estáticos (sin backend).

---

## Tecnologías

| Herramienta | Uso |
|---|---|
| Vue 3 + `<script setup>` | Framework principal |
| TypeScript | Tipado estático |
| Pinia | Manejo de estado global (carrito) |
| Vue Router | Navegación entre páginas |
| Tailwind CSS v4 | Estilos y diseño responsive |
| @iconify/vue (MDI) | Iconos SVG |
| Vite | Bundler y servidor de desarrollo |

---

## Funcionalidades

- **Home** — Banner de bienvenida, sección informativa de la veterinaria y categorías visuales clickeables que redirigen al catálogo filtrado.
- **Catálogo** — Grid de 16 productos con buscador en tiempo real y filtro por categoría.
- **Carrito lateral** — Panel deslizante con lista de productos, controles de cantidad (+/−), eliminación individual y total de compra.
- **Modal de pago** — Formulario simulado con validación (nombre, correo, tarjeta, vencimiento, CVV), animación de carga y pantalla de éxito. Al confirmar, el carrito se vacía automáticamente.
- **Diseño responsive** — Adaptado para PC, tablet y celular.

---

## Estructura del proyecto

```
frontend/src/
│
├── types/
│   └── product.types.ts       # Interfaces: Product, CartItem, Category
│
├── data/
│   └── products.ts            # 16 productos estáticos en 4 categorías
│
├── stores/
│   └── cart.ts                # Store Pinia: items, totales, add/remove/clear
│
├── components/
│   ├── AppNavbar.vue          # Barra de navegación con badge del carrito
│   ├── ProductCard.vue        # Tarjeta de producto con botón "Agregar"
│   ├── CartSidebar.vue        # Panel lateral del carrito de compras
│   └── CheckoutModal.vue      # Modal de pago con validación y pantalla de éxito
│
├── pages/
│   ├── HomeView.vue           # Página principal: banner, info y categorías
│   └── CatalogView.vue        # Catálogo con buscador y filtro por categoría
│
├── router/
│   └── index.ts               # Rutas: / (Home) y /catalogo (Catálogo)
│
├── App.vue                    # Componente raíz: Navbar + CartSidebar + RouterView
├── main.ts                    # Punto de entrada: Vue, Pinia, Router
└── style.css                  # Importación global de Tailwind CSS
```

---

## Descripción de archivos clave

**`product.types.ts`** — Define los tipos base del proyecto: `Category` (unión de las 4 categorías), `Product` (id, nombre, precio, categoría, imagen, descripción) y `CartItem` (producto + cantidad).

**`products.ts`** — Array de 16 productos con imágenes reales de Unsplash, distribuidos en las categorías Alimentos, Higiene, Juguetes y Accesorios.

**`cart.ts`** — Store Pinia con estado reactivo del carrito. Expone `items`, `totalItems`, `totalPrice`, y las acciones `addProduct`, `increment`, `decrement`, `remove`, `clearCart`, `toggleCart` y `closeCart`.

**`AppNavbar.vue`** — Navbar sticky con logo, links de navegación y botón del carrito con badge numérico. Responsive con menú secundario en móvil.

**`ProductCard.vue`** — Tarjeta con imagen, badge de categoría, nombre, descripción, precio y botón que llama a `cart.addProduct()`.

**`CartSidebar.vue`** — Panel lateral animado (slide desde la derecha) con overlay. Muestra los items del carrito, controles de cantidad y el total. El botón "Proceder al pago" abre el `CheckoutModal`.

**`CheckoutModal.vue`** — Modal con dos estados: formulario de pago (nombre, correo, número de tarjeta con formato automático, vencimiento y CVV) con validación en cliente, y pantalla de éxito tras simular el pago. Al cerrar la pantalla de éxito se ejecuta `cart.clearCart()`.

**`HomeView.vue`** — Página principal con hero animado, sección "Sobre VetShop" con tres tarjetas informativas y grid de categorías que navegan al catálogo con filtro preseleccionado.

**`CatalogView.vue`** — Página del catálogo. Lee el query param `?categoria=` para preseleccionar el filtro al llegar desde Home. Filtra productos en tiempo real combinando búsqueda de texto y categoría.

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Verificación de tipos
npm run type-check
```
