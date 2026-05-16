export type Category = 'Alimentos' | 'Higiene' | 'Juguetes' | 'Accesorios'

export interface Product {
  id: number
  name: string
  price: number
  category: Category
  image: string
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
}
