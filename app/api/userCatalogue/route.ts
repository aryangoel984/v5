import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function GET() {

  try {
    const sellers = await prisma.seller.findUnique({
      where: {id: 1},
      include: {
        products: true
      }
    })
    return NextResponse.json(sellers, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching sellers' }, { status: 500 })
  }
}
