export interface Category {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: number
  url: string
  alt: string
  productId: number
}

export interface ProductVariant {
  id: number
  sku: string
  name: string
  price: number
  productId: number
}

export interface ProductSpecifications {
  id: number
  productId: number
  type: string
  description: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  sku: string
  stockQuantity: number
  sellerId: number
  categoryId: number
  createdAt: string
  updatedAt: string
  category: Category
  images: ProductImage[]
  variants: ProductVariant[]
  specifications: ProductSpecifications[]
}

