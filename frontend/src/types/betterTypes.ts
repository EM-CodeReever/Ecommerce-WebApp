import { Images } from "@prisma/client"

export type Cart = {
    id: number
    userId: number
    total: number
    cartItems: CartItem[]
}

export type CartItem = {
    id: number
    quantity: number
    productId: number
    product: Product
    cartId: number
  }

  export type Product = {
    id: number
    name: string
    description: string
    price: number
    thumbnail: string
    images: Images[]
    categoryId: number
    rating: number
    stock: number
    createdAt: Date
    updatedAt: Date
  }