"use server"

import type { Product } from "@/types/product"

export async function fetchProducts(): Promise<Product[]> {
  // In a real application, this would fetch from an actual API or database
  const response = await fetch("http://localhost:3000/api/GET/1")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

export async function updateProduct(product: Product): Promise<Product> {
  const response = await fetch(`http://localhost:3000/api/PUT`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error("Failed to update product")
  }
  return response.json()
}

export async function deleteProduct(productId: number): Promise<{ message: string }> {
  const response = await fetch(`http://localhost:3000/api/DELETE`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete product")
  }
  return response.json()
}

