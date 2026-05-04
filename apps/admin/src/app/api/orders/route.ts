import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const orders = await prisma.order.findMany({
         include: { orderItems: { include: { product: true } } },
         orderBy: { createdAt: 'desc' },
      })
      return NextResponse.json(orders)
   } catch (error) {
      console.error('[ORDERS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
