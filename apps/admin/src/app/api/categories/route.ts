import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const { title, description, bannerId } = body

      if (!title) {
         return new NextResponse('Name is required', { status: 400 })
      }

      const data: any = { title }
      if (description) data.description = description
      if (bannerId) data.banners = { connect: { id: bannerId } }

      const category = await prisma.category.create({ data })

      return NextResponse.json(category)
   } catch (error) {
      console.error('[CATEGORIES_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function GET() {
   try {
      const categories = await prisma.category.findMany()
      return NextResponse.json(categories)
   } catch (error) {
      console.error('[CATEGORIES_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
