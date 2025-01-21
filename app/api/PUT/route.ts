import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    // Parse the request body
    const {
      id,
      name,
      description,
      price,
      sku,
      stockQuantity,
      categoryId,
      images,
      variants,
      specifications,
    } = await req.json();

    // Validate required fields
    if (!id || !name || !price || !sku || !stockQuantity || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Clear old specifications
    await prisma.specification.deleteMany({
      where: { productId: parseInt(id, 10) },
    });

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        price,
        sku,
        stockQuantity,
        categoryId,
        images: {
          deleteMany: {}, // Clear old images
          create: images?.map((image: { url: string; alt?: string }) => ({
            url: image.url,
            alt: image.alt,
          })),
        },
        variants: {
          deleteMany: {}, // Clear old variants
          create: variants?.map((variant: { sku: string; name: string; price: number }) => ({
            sku: variant.sku,
            name: variant.name,
            price: variant.price,
          })),
        },
      },
      include: {
        images: true,
        variants: true,
      },
    });

    // Add new specifications
    if (specifications?.length) {
      await prisma.specification.createMany({
        data: specifications.map((spec: { type: string; description: string }) => ({
          type: spec.type,
          description: spec.description,
          productId: updatedProduct.id,
        })),
      });
    }

    // Return the updated product
    const result = await prisma.product.findUnique({
      where: { id: updatedProduct.id },
      include: {
        images: true,
        variants: true,
        specifications: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
