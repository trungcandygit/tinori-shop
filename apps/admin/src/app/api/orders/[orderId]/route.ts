import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   _: Request,
   { params }: { params: { orderId: string } }
) {
   try {
      const order = await prisma.order.findUnique({
         where: { id: params.orderId },
         include: { orderItems: { include: { product: true } } },
      })
      return NextResponse.json(order)
   } catch (error) {
      console.error('[ORDER_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(
   req: Request,
   { params }: { params: { orderId: string } }
) {
   try {
      const body = await req.json()
      const { status, isPaid, isCompleted, shipping, payable, discount } = body

      const order = await prisma.order.update({
         where: { id: params.orderId },
         data: {
            ...(status && { status }),
            ...(isPaid !== undefined && { isPaid }),
            ...(isCompleted !== undefined && { isCompleted }),
            ...(shipping !== undefined && { shipping: Number(shipping) }),
            ...(payable !== undefined && { payable: Number(payable) }),
            ...(discount !== undefined && { discount: Number(discount) }),
         },
      })

      return NextResponse.json(order)
   } catch (error) {
      console.error('[ORDER_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
