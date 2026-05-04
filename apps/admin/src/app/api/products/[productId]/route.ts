import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   _: Request,
   { params }: { params: { productId: string } }
) {
   try {
      const product = await prisma.product.findUniqueOrThrow({
         where: { id: params.productId },
      })
      return NextResponse.json(product)
   } catch (error) {
      console.error('[PRODUCT_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(
   _: Request,
   { params }: { params: { productId: string } }
) {
   try {
      const product = await prisma.product.delete({
         where: { id: params.productId },
      })
      return NextResponse.json(product)
   } catch (error) {
      console.error('[PRODUCT_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(
   req: Request,
   { params }: { params: { productId: string } }
) {
   try {
      const { title, images, price, discount, stock, categoryId, isFeatured, isAvailable } =
         await req.json()

      const product = await prisma.product.update({
         where: { id: params.productId },
         data: {
            title,
            ...(images !== undefined && { images }),
            price: price !== undefined ? Number(price) : undefined,
            discount: discount !== undefined ? Number(discount) : undefined,
            stock: stock !== undefined ? Number(stock) : undefined,
            isFeatured,
            isAvailable,
            ...(categoryId && {
               categories: { set: [], connect: { id: categoryId } },
            }),
         },
      })

      return NextResponse.json(product)
   } catch (error) {
      console.error('[PRODUCT_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
