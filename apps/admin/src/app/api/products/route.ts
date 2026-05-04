import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { title, images, price, discount, stock, categoryId, isFeatured, isAvailable } =
         await req.json()

      if (!title || !categoryId) {
         return new NextResponse('Title and category are required', { status: 400 })
      }

      const product = await prisma.product.create({
         data: {
            title,
            images: images ?? [],
            price: Number(price),
            discount: Number(discount ?? 0),
            stock: Number(stock ?? 0),
            isFeatured: Boolean(isFeatured),
            isAvailable: Boolean(isAvailable),
            brand: {
               connectOrCreate: {
                  where: { title: 'Tinori Fashion' },
                  create: { title: 'Tinori Fashion', description: 'Thương hiệu mặc định' },
               },
            },
            categories: {
               connect: { id: categoryId },
            },
         },
      })

      return NextResponse.json(product)
   } catch (error) {
      console.error('[PRODUCTS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const products = await prisma.product.findMany({
         include: { categories: true, brand: true },
      })

      return NextResponse.json(products)
   } catch (error) {
      console.error('[PRODUCTS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
