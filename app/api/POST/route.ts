import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    console.log('Request Headers:', request.headers);

    // Attempt to parse the request body
    const body = await request.json();
    console.log('Received Payload:', body);

    // Extract fields
    const {
      name,
      description,
      price,
      sku,
      stockQuantity,
      sellerId,
      categoryId,
      createdAt,
      updatedAt,
    } = body;

    // Validate required fields
    if (!name || !sku || price === undefined || !sellerId || !categoryId) {
      console.error('Validation Error: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for related entities in the database
    const sellerExists = await prisma.seller.findUnique({
      where: { id: sellerId },
    });
    if (!sellerExists) {
      console.error('Error: Seller not found');
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      console.error('Error: Category not found');
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Attempt to create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        stockQuantity,
        sellerId,
        categoryId,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
    });

    console.log('Product Created:', newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error Details:', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload or internal server error' },
      { status: 500 }
    );
  }
}
