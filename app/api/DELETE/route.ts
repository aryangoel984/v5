import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request : any, headers : any) {
  try {
    const body = await request.json()
    const { id } = body
    const headers = {id : id}

    const deletedproduct = await prisma.product.delete({
        where : {
            id : headers.id,
        },
    })

    return  NextResponse.json(deletedproduct, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting seller' }, { status: 500 })
  }
}