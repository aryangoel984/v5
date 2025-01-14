import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request : any) {
  try {
    const body = await request.json()
    const { name, description, price, sku, stockQuantity, sellerId, categoryId, attributes, createdAt, updatedAt, seller, category, reviews, images } = body

    const newSeller = await prisma.product.create({
      data: {
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
        seller: {
          connect: {
            id: sellerId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        reviews: {
          create: [],
        },
        images: {
          create: [],
        },

      },
    })
    return NextResponse.json(newSeller, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating seller' }, { status: 500 })
  }
}
