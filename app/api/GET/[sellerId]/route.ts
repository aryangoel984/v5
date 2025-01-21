import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function GET(req: Request, { params }: { params: { sellerId: string } }) {
  const { sellerId } = params;

  // Ensure sellerId is a valid number
  const sellerIdInt = parseInt(sellerId);
  if (isNaN(sellerIdInt)) {
    return NextResponse.json(
      { error: 'Invalid seller ID' },
      { status: 400 }
    );
  }

  try {
    // Fetch products for the specific seller
    const products = await prismaClient.product.findMany({
      where: {
        sellerId: sellerIdInt,
      },
      include: {
        category: true, // Include category information if needed
        images: true,   // Include product images
        variants: true, // Include product variants
        specifications: true
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { message: 'No products found for this seller' },
        { status: 404 }
      );
    }


    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}
