import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      price,
      stockQuantity,
      sku,
      sellerId,
      categoryId,
      variants,
      images,
      specifications,
      createdAt,
      updatedAt,
    } = body;

    // Validate required fields
    if (!name || !sku || !price || !sellerId || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if seller and category exist
    const sellerExists = await prisma.seller.findUnique({ where: { id: sellerId } });
    const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!sellerExists || !categoryExists) {
      return NextResponse.json({ error: 'Invalid sellerId or categoryId' }, { status: 404 });
    }

    // Create the product with nested relations
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stockQuantity,
        sku,
        sellerId,
        categoryId,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
        variants: {
          create: variants, // Array of variants
        },
        images: {
          create: images, // Array of images
        },
        specifications: {
          create: specifications, // Array for specifications
        },
      },
      include: {
        variants: true,
        images: true,
        specifications: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    );
  }
}
