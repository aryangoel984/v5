import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      price,
      sku,
      stockQuantity,
      sellerId,
      categoryId,
      attributes,
      createdAt,
      updatedAt,
    } = body

    // Input validation
    if (!name || !sku || !price || !sellerId || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if seller and category exist
    const sellerExists = await prisma.seller.findUnique({ where: { id: sellerId } })
    const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } })

    if (!sellerExists || !categoryExists) {
      return NextResponse.json({ error: 'Invalid sellerId or categoryId' }, { status: 404 })
    }

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        stockQuantity,
        sellerId,
        categoryId,
        attributes, // Stored as JSON
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: error.message || 'Error creating product' },
      { status: 500 }
    )
  }
}
