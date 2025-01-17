import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request) {
  try {
    const body = await request.json(); // Parse the raw JSON body

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body. Must be a JSON object.' }, { status: 400 });
    }

    const { id } = body;

    // Validate `id`
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'Product ID must be a valid number' }, { status: 400 });
    }

    console.log('Deleting product with ID:', id);

    // Check if the product exists
    const productExists = await prisma.product.findUnique({ where: { id } });
    if (!productExists) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete the product
    await prisma.product.delete({
      where: { id },
    });

    console.log('Product deleted successfully:', id);

    return NextResponse.json({ message: `Product with ID ${id} deleted successfully.` }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);

    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
