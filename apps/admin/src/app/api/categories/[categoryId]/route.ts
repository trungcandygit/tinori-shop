import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   _: Request,
   { params }: { params: { categoryId: string } }
) {
   try {
      const category = await prisma.category.findUnique({
         where: { id: params.categoryId },
      })
      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORY_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(
   _: Request,
   { params }: { params: { categoryId: string } }
) {
   try {
      const category = await prisma.category.delete({
         where: { id: params.categoryId },
      })
      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORY_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function PATCH(
   req: Request,
   { params }: { params: { categoryId: string } }
) {
   try {
      const body = await req.json()
      const { title, description, bannerId } = body

      if (!title) {
         return new NextResponse('Name is required', { status: 400 })
      }

      const data: any = { title }
      if (description !== undefined) data.description = description
      if (bannerId) data.banners = { connect: { id: bannerId } }

      const updatedCategory = await prisma.category.update({
         where: { id: params.categoryId },
         data,
      })

      return NextResponse.json(updatedCategory)
   } catch (error) {
      console.error('[CATEGORY_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
