import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   _: Request,
   { params }: { params: { brandId: string } }
) {
   try {
      const brand = await prisma.brand.findUnique({
         where: { id: params.brandId },
      })
      return NextResponse.json(brand)
   } catch (error) {
      console.error('[BRAND_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(
   _: Request,
   { params }: { params: { brandId: string } }
) {
   try {
      const brand = await prisma.brand.delete({
         where: { id: params.brandId },
      })
      return NextResponse.json(brand)
   } catch (error) {
      console.error('[BRAND_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(
   req: Request,
   { params }: { params: { brandId: string } }
) {
   try {
      const body = await req.json()
      const { title, description, logo } = body

      const updatedBrand = await prisma.brand.update({
         where: { id: params.brandId },
         data: {
            ...(title && { title }),
            ...(description !== undefined && { description }),
            ...(logo !== undefined && { logo }),
         },
      })

      return NextResponse.json(updatedBrand)
   } catch (error) {
      console.error('[BRAND_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
